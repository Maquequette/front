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
    label: "Static"
  },
  {
    id: "angular",
    label: "Angular"
  },
  {
    id: "react",
    label: "React"
  },
  {
    id: "react-ts",
    label: "React Typescript"
  },
  {
    id: "solid",
    label: "Solid"
  },
  {
    id: "svelte",
    label: "Svelte"
  },
  {
    id: "test-ts",
    label: "Test Typescript"
  },
  {
    id: "vanilla-ts",
    label: "Vanilla Typescript"
  },
  {
    id: "vanilla",
    label: "Vanilla"
  },
  {
    id: "vue",
    label: "Vue"
  },
  {
    id: "vue-ts",
    label: "Vue Typescript"
  },
  {
    id: "node",
    label: "Node"
  },
  {
    id: "nextjs",
    label: "Nextjs"
  },
  {
    id: "vite",
    label: "Vite"
  },
  {
    id: "vite-react",
    label: "Vite React"
  },
  {
    id: "vite-react-ts",
    label: "Vite React Typescript"
  },
  {
    id: "vite-vue",
    label: "Vite Vue"
  },
  {
    id: "vite-vue-ts",
    label: "Vite Vue Typescript"
  },
  {
    id: "vite-svelte",
    label: "Vite Svelt"
  },
  {
    id: "vite-svelte-ts",
    label: "Vite Svelte Typescript"
  },
  {
    id: "astro",
    label: "Astro"
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
  template = "vanilla",
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
            <CodeEditor socket={socket!} room={roomId} template={template} />
          )}
          <CodePreview setFullScreen={handleFullScreen} />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
