import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
  SandpackCodeEditor,
  SandpackFileExplorer
} from "@codesandbox/sandpack-react";
import { SandpackPredefinedTemplate } from "@codesandbox/sandpack-react";
import { Mode } from "@/types/Mode";
import * as Y from "yjs";
import { yCollab } from "y-codemirror.next";
import { WebrtcProvider } from "y-webrtc";

export interface ICode {
  template: SandpackPredefinedTemplate;
  theme: Mode;
  language: string;
}

export default function Code({ template, theme, language }: ICode) {
  const ydoc = new Y.Doc();
  const provider = new WebrtcProvider("codemirror6-demo-room", ydoc);
  const ytext = ydoc.getText("codemirror");
  const undoManager = new Y.UndoManager(ytext);

  return (
    <SandpackProvider template={template}>
      <SandpackLayout>
        <SandpackFileExplorer />
        <SandpackCodeEditor
          showTabs
          showLineNumbers={false}
          showInlineErrors
          wrapContent
          closableTabs
          extensions={[yCollab(ytext, provider.awareness, { undoManager })]}
        />

        <SandpackPreview
          showNavigator={true}
          showRefreshButton={true}
          showOpenInCodeSandbox={false}
          showOpenNewtab={true}
        />
      </SandpackLayout>
    </SandpackProvider>
  );
}
