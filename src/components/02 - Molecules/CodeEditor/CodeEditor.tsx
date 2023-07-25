import { SandpackCodeEditor, useActiveCode } from "@codesandbox/sandpack-react";
import { abbreviationTracker } from "@emmetio/codemirror6-plugin";
import { searchKeymap, search } from "@codemirror/search";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { getDocument, peerExtension } from "@/utils/collab";
import { generateName } from "@/utils/usernames";
import { cursorExtension } from "@/utils/cursors";
import "./CodeEditor.scss";

export interface ICodeEditor {
  socket: Socket;
}

export default function CodeEditor({ socket }: ICodeEditor) {
  const { updateCode } = useActiveCode();
  const [isConnected, setIsConnected] = useState(false);
  const [version, setVersion] = useState(-1);
  const [documentName, setDocumentName] = useState("default-doc");
  const [username, setUsername] = useState(generateName());
  const [state, setState] = useState();

  useEffect(() => {
    const fetchDoc = async () => {
      const data = await getDocument(socket, documentName);
      updateCode(data.doc.toString());
      setVersion(data.version);
    };

    fetchDoc();

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pullUpdateResponse");
      socket.off("pushUpdateResponse");
      socket.off("getDocumentResponse");
    };
  }, []);

  return (
    version && (
      <SandpackCodeEditor
        showTabs
        showLineNumbers
        showInlineErrors
        wrapContent
        closableTabs
        extensionsKeymap={[...searchKeymap]}
        extensions={[
          abbreviationTracker(),
          search(),
          //peerExtension(socket, documentName, version, username),
          cursorExtension(username)
        ]}
        className="editor__code"
      />
    )
  );
}
