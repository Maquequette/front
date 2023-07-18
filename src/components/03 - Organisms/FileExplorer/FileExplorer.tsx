import { useEffect } from "react";
import type { SandpackBundlerFiles } from "@codesandbox/sandpack-client";
import { SandpackFileExplorerProp, useSandpack } from "@codesandbox/sandpack-react";
import { ModuleList } from "@/components/02 - Molecules/ModuleList/ModuleList";
import "./FileExplorer.scss";

export default function FileExplorer({
  className,
  autoHiddenFiles = false,
  initialCollapsedFolder = [],
  ...props
}: SandpackFileExplorerProp & React.HTMLAttributes<HTMLDivElement>) {
  const {
    sandpack: {
      status,
      updateFile,
      deleteFile,
      activeFile,
      files,
      openFile,
      visibleFilesFromProps
    },
    listen
  } = useSandpack();

  useEffect(
    function watchFSFilesChanges() {
      if (status !== "running") return;

      const unsubscribe = listen((message) => {
        if (message.type === "fs/change") {
          updateFile(message.path, message.content, false);
        }

        if (message.type === "fs/remove") {
          deleteFile(message.path, false);
        }
      });

      return unsubscribe;
    },
    [status]
  );

  const orderedFiles = Object.keys(files)
    .sort()
    .reduce<SandpackBundlerFiles>((obj, key) => {
      obj[key] = files[key];
      return obj;
    }, {});

  return (
    <div className="fileExplorer" {...props}>
      <div className="fileExplorer__list">
        <ModuleList
          activeFile={activeFile}
          autoHiddenFiles={autoHiddenFiles}
          files={orderedFiles}
          initialCollapsedFolder={initialCollapsedFolder}
          prefixedPath="/"
          selectFile={openFile}
          visibleFiles={visibleFilesFromProps}
        />
      </div>
      
    </div>
  );
}
