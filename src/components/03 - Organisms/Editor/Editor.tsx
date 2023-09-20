import { useRef, useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  type SandpackPredefinedTemplate
} from "@codesandbox/sandpack-react";
import { io } from "socket.io-client";
import { type Mode } from "@/types/Mode";
import SoloCodeEditor from "@/components/02 - Molecules/CodeEditor/CodeEditor";
import CodeEditor from "@/components/02 - Molecules/Collab/CodeEditor/CodeEditor";
import CodePreview from "@/components/02 - Molecules/CodePreview/CodePreview";
import FileExplorer from "@/components/02 - Molecules/FileExplorer/FileExplorer";
import Multiselect from "@/components/02 - Molecules/Multiselect/Multiselect";
import "./Editor.scss";

function connectSocket() {
  return io(import.meta.env.VITE_SOCKET_URL, {
    path: "/api"
  });
}

const SANDBOX_TEMPLATES = [
  {
    id: "static",
    label: "static"
  },
  {
    id: "angular",
    label: "angular"
  },
  {
    id: "react",
    label: "react"
  },
  {
    id: "react-ts",
    label: "react-ts"
  },
  {
    id: "solid",
    label: "solid"
  },
  {
    id: "svelte",
    label: "svelte"
  },
  {
    id: "test-ts",
    label: "test-ts"
  },
  {
    id: "vanilla-ts",
    label: "vanilla-ts"
  },
  {
    id: "vanilla",
    label: "vanilla"
  },
  {
    id: "vue",
    label: "vue"
  },
  {
    id: "vue-ts",
    label: "vue-ts"
  },
  {
    id: "node",
    label: "node"
  },
  {
    id: "nextjs",
    label: "nextjs"
  },
  {
    id: "vite",
    label: "vite"
  },
  {
    id: "vite-react",
    label: "vite-react"
  },
  {
    id: "vite-react-ts",
    label: "vite-react-ts"
  },
  {
    id: "vite-vue",
    label: "vite-vue"
  },
  {
    id: "vite-vue-ts",
    label: "vite-vue-ts"
  },
  {
    id: "vite-svelte",
    label: "vite-svelte"
  },
  {
    id: "vite-svelte-ts",
    label: "vite-svelte-ts"
  },
  {
    id: "astro",
    label: "astro"
  }
];

export interface ICode {
  template?: SandpackPredefinedTemplate;
  theme: Mode;
  roomId?: string;
  solo?: boolean;
  hasSelect?: boolean;
}

export default function Editor({
  template,
  theme,
  roomId = crypto.randomUUID(),
  solo = false,
  hasSelect = false
}: ICode) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const ref: any = useRef();
  const socket = solo ? undefined : connectSocket();
  const [selectedTemplate, setSelectedTemplate] = useState(template);

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
    <div className="editor">
      {hasSelect && (
        <div className="editor__template">
          <Multiselect
            callback={(value) => {
              setSelectedTemplate(value[0]?.id);
            }}
            theme="primary"
            multiple={false}
            options={SANDBOX_TEMPLATES}
          />
        </div>
      )}

      <SandpackProvider template={selectedTemplate} theme={theme}>
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
    </div>
  );
}
