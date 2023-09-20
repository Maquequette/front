import {
  SandpackProvider,
  SandpackLayout,
  type SandpackPredefinedTemplate
} from "@codesandbox/sandpack-react";
import { type Mode } from "@/types/Mode";
import SoloCodeEditor from "@/components/02 - Molecules/CodeEditor/CodeEditor";
import CodeEditor from "@/components/02 - Molecules/Collab/CodeEditor/CodeEditor";
import CodePreview from "@/components/02 - Molecules/CodePreview/CodePreview";
import FileExplorer from "@/components/02 - Molecules/FileExplorer/FileExplorer";
import { useRef, useState } from "react";
import "./Editor.scss";

import { io } from "socket.io-client";

export interface ICode {
  template: SandpackPredefinedTemplate;
  theme: Mode;
  roomId?: string;
  solo?: boolean;
}

const socket = io("http://localhost:8000", {
  path: "/api"
});

export default function Editor({
  template,
  theme,
  roomId = crypto.randomUUID(),
  solo = false
}: ICode) {
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
        {solo ? (
          <SoloCodeEditor />
        ) : (
          <CodeEditor socket={socket} room={roomId} template={template} />
        )}
        <CodePreview setFullScreen={handleFullScreen} />
      </SandpackLayout>
    </SandpackProvider>
  );
}
