import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackConsole
} from "@codesandbox/sandpack-react";
import { SandpackPredefinedTemplate } from "@codesandbox/sandpack-react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { Mode } from "@/types/Mode";

export interface ICode {
  template: SandpackPredefinedTemplate;
  theme: Mode;
  language: string;
}

export default function Code({ template, theme, language }: ICode) {
  return (
    <SandpackProvider template={template} theme={theme}>
      <SandpackLayout>
        <SandpackFileExplorer />
        <SandpackCodeEditor showTabs={true} />
        <SandpackPreview style={{ height: "80vh" }} />
      </SandpackLayout>
      <SandpackConsole />
    </SandpackProvider>
  );
}
