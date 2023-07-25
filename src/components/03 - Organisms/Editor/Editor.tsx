import {
  SandpackProvider,
  SandpackLayout,
  SandpackPredefinedTemplate
} from "@codesandbox/sandpack-react";
import { Mode } from "@/types/Mode";
import CodeEditor from "@/components/02 - Molecules/CodeEditor/CodeEditor";
import CodePreview from "@/components/02 - Molecules/CodePreview/CodePreview";
import FileExplorer from "@/components/02 - Molecules/FileExplorer/FileExplorer";
import { useRef, useState } from "react";
import "./Editor.scss";

export interface ICode {
  template: SandpackPredefinedTemplate;
  theme: Mode;
  roomId?: string;
}

import { io } from "socket.io-client";

const socket = io("http://localhost:8000", {
  path: "/api"
});

export default function Editor({ template, theme, roomId = crypto.randomUUID() }: ICode) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const ref: any = useRef();

  const handleFullScreen = () => {
    if (ref.current) {
      if (isFullScreen) {
        document.exitFullscreen();
      } else {
        ref.current.requestFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };

  return (
    <SandpackProvider template={template} theme={theme} className={`editor`}>
      <SandpackLayout
        ref={ref}
        className={`editor__layout ${isFullScreen ? "editor__layout--fullscreen" : ""}`}>
        <FileExplorer />
        <CodeEditor socket={socket} />
        <CodePreview setFullScreen={handleFullScreen} />
      </SandpackLayout>
    </SandpackProvider>
  );
}
