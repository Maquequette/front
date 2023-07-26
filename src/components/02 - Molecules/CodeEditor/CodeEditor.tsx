import { SandpackCodeEditor, useActiveCode } from "@codesandbox/sandpack-react";
import { abbreviationTracker } from "@emmetio/codemirror6-plugin";
import { searchKeymap, search } from "@codemirror/search";
import { useEffect, useMemo, useState } from "react";
import { Socket } from "socket.io-client";
import { getDocument, peerExtension } from "@/utils/collab";
import { generateName } from "@/utils/usernames";
import { cursorExtension } from "@/utils/cursors";

import "./CodeEditor.scss";

export interface ICodeEditor {
  socket: Socket;
}

export default function CodeEditor({ socket }: ICodeEditor) {
  const { code, updateCode } = useActiveCode();
  const [isConnected, setIsConnected] = useState(false);
  const [version, setVersion] = useState(-1);
  const [documentName, setDocumentName] = useState("default-doc");
  const [username, setUsername] = useState(generateName());
  const [state, setState] = useState();

  useEffect(() => {
    const fetchDoc = async () => {
      const { doc, version } = await getDocument(socket, documentName);
      updateCode(doc.toString(), true);
      setVersion(version);
    };
    fetchDoc();
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });
    socket.on("display", async (documentName) => {
      const { doc, version } = await getDocument(socket, documentName);
      updateCode(doc.toString(), true);
      setVersion(version);
      setDocumentName(documentName);
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("display");
      socket.off("pullUpdateResponse");
      socket.off("pushUpdateResponse");
      socket.off("getDocumentResponse");
    };
  }, []);

  return (
    true &&
    useMemo(
      () => (
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
            search()
            //peerExtension(socket, documentName, version, username),
            //cursorExtension(username)
          ]}
          className="editor__code"
        />
      ),
      []
    )
  );
}
