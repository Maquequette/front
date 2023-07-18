import { useRef } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackFileExplorer,
  SandpackPredefinedTemplate
} from "@codesandbox/sandpack-react";
import * as Y from "yjs";
// import { WebsocketProvider } from "y-websocket";
import { Mode } from "@/types/Mode";
import CodeEditor from "@/components/02 - Molecules/CodeEditor/CodeEditor";
import CodePreview from "@/components/02 - Molecules/CodePreview/CodePreview";
import FileExplorer from "@/components/03 - Organisms/FileExplorer/FileExplorer";

export interface ICode {
  template: SandpackPredefinedTemplate;
  theme: Mode;
  roomId?: string;
}

export default function Editor({ template, theme, roomId = crypto.randomUUID() }: ICode) {
  // const ydoc = useRef(new Y.Doc());
  // const provider = useRef(
  //   new WebsocketProvider(
  //     "ws://localhost:1234", // URL du serveur y-websocket
  //     roomId, // Identifiant unique pour la collaboration
  //     ydoc.current
  //   )
  // );
  // const ytext = useRef(ydoc.current.getText("codemirror"));
  // const undoManager = useRef(new Y.UndoManager(ytext.current));

  return (
    <SandpackProvider template={template} theme={theme}>
      <SandpackLayout>
        <FileExplorer />
        <CodeEditor
        // ytext={ytext.current}
        // provider={provider.current}
        // undoManager={undoManager.current}
        />
        <CodePreview />
      </SandpackLayout>
    </SandpackProvider>
  );
}
