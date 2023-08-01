import {
  SandpackCodeEditor,
  SandpackPredefinedTemplate,
  useSandpack
} from "@codesandbox/sandpack-react";
import { abbreviationTracker } from "@emmetio/codemirror6-plugin";
import { searchKeymap, search } from "@codemirror/search";
import { useEffect, useMemo, useState } from "react";
import { Socket } from "socket.io-client";
import { peerExtension } from "@/utils/collab";
import { generateName } from "@/utils/usernames";
import { cursorExtension } from "@/utils/cursors";
import { getDocument } from "@/utils/collab";
import "./CodeEditor.scss";

export interface ICodeEditor {
  socket: Socket;
  room: string;
  template: SandpackPredefinedTemplate;
}

export default function CodeEditor({ socket, room, template }: ICodeEditor) {
  const [username, setUsername] = useState(generateName());
  const { sandpack } = useSandpack();
  const [version, setVersion] = useState<number | null>(null);

  useEffect(() => {
    const fetchDoc = async () => {
      const { files, version } = await getDocument(socket, room, template, sandpack.activeFile);
      Object.entries(files).forEach((entry: [any, any]) => {
        const [key, value] = entry;

        sandpack.updateFile(key, value.code[0], true);
      });

      setVersion(version);
    };

    fetchDoc();

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pull:updates:response");
      socket.off("push:updates:response");
      socket.off("get:document:response");
    };
  }, [sandpack.activeFile]);

  return useMemo(
    () =>
      version != null && (
        <SandpackCodeEditor
          key={crypto.randomUUID()}
          showTabs
          showLineNumbers
          showInlineErrors
          wrapContent
          closableTabs
          extensionsKeymap={[...searchKeymap]}
          extensions={[
            abbreviationTracker(),
            search(),
            peerExtension(socket, room, version, username, sandpack.activeFile),
            cursorExtension(username)
          ]}
          className="editor__code"
        />
      ),
    [version, sandpack.activeFile]
  );
}
