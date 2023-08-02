import { EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view";
import { StateEffect, ChangeSet } from "@codemirror/state";
import {
  Update,
  receiveUpdates,
  sendableUpdates,
  collab,
  getSyncedVersion
} from "@codemirror/collab";
import { Socket } from "socket.io-client";
import { cursor, addCursor } from "./cursors";
import { SandpackPredefinedTemplate } from "@codesandbox/sandpack-react/types";

function pushUpdates(
  socket: Socket,
  version: number,
  fullUpdates: readonly Update[],
  room: string,
  activeFile: string
): Promise<boolean> {
  // Strip off transaction data
  const updates = fullUpdates.map((u) => ({
    clientID: u.clientID,
    changes: u.changes.toJSON(),
    effects: u.effects
  }));

  return new Promise(function (resolve) {
    socket.emit("push:updates", version, JSON.stringify(updates), room, activeFile);

    socket.once("push:updates:response", function (status: boolean) {
      resolve(status);
    });
  });
}

function pullUpdates(socket: Socket, version: number, room: string, activeFile: string) {
  return new Promise(function (resolve) {
    socket.emit("pull:updates", version, room, activeFile);
    socket.once("pull:updates:response", function (updates: any) {
      resolve(JSON.parse(updates));
    });
  })
    .then((updates: any) =>
      updates.map((u: any) => {
        if (u.effects[0]) {
          const effects: StateEffect<any>[] = [];

          u.effects.forEach((effect: StateEffect<any>) => {
            if (effect.value?.id) {
              const cursor: cursor = {
                id: effect.value.id,
                from: effect.value.from,
                to: effect.value.to
              };

              effects.push(addCursor.of(cursor));
            }
          });

          return {
            changes: ChangeSet.fromJSON(u.changes),
            clientID: u.clientID,
            effects
          };
        }

        return {
          changes: ChangeSet.fromJSON(u.changes),
          clientID: u.clientID
        };
      })
    )
    .catch((err) => console.log(err));
}

export function getDocument(
  socket: Socket,
  room: string,
  template: SandpackPredefinedTemplate,
  activeFile: string
): Promise<{ version: number; files: string }> {
  return new Promise(function (resolve) {
    socket.emit("get:document", room, template, activeFile);

    socket.once("get:document:response", function (version: number, files: any) {
      resolve({
        version,
        files
      });
    });
  });
}

export const peerExtension = (
  socket: Socket,
  room: string,
  startVersion: number,
  id: string,
  activeFile: string
) => {
  const plugin = ViewPlugin.fromClass(
    class {
      private pushing = false;
      private done = false;

      constructor(private view: EditorView) {
        this.pull();
      }

      update(update: ViewUpdate) {
        if (update.docChanged || update.transactions[0]?.effects[0]) this.push();
      }

      async push() {
        const updates = sendableUpdates(this.view.state);
        if (this.pushing || !updates.length) return;
        this.pushing = true;
        const version = getSyncedVersion(this.view.state);

        await pushUpdates(socket, version, updates, room, activeFile);
        this.pushing = false;
        // Regardless of whether the push failed or new updates came in
        // while it was running, try again if there's updates remaining
        if (sendableUpdates(this.view.state).length) {
          setTimeout(() => this.push(), 100);
        }
      }

      async pull() {
        while (!this.done) {
          const version = getSyncedVersion(this.view.state);
          const updates = await pullUpdates(socket, version, room, activeFile);
          const newUpdates = receiveUpdates(this.view.state, updates);

          this.view.dispatch(newUpdates);
        }
      }

      destroy() {
        this.done = true;
      }
    }
  );

  return [
    collab({
      startVersion,
      clientID: id,
      sharedEffects: (tr) => {
        const effects = tr.effects.filter((e) => {
          return e.is(addCursor);
        });

        return effects;
      }
    }),
    plugin
  ];
};
