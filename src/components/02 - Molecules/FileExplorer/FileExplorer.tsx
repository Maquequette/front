import { useEffect, useState } from "react";
import type { SandpackBundlerFiles } from "@codesandbox/sandpack-client";
import { type SandpackFileExplorerProp, useSandpack } from "@codesandbox/sandpack-react";
import ModuleList from "@/components/02 - Molecules/ModuleList/ModuleList";
import useClickOutside from "@/hooks/useClickOutside";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import "./FileExplorer.scss";

export default function FileExplorer({
  className,
  autoHiddenFiles = false,
  initialCollapsedFolder = [],
  ...props
}: SandpackFileExplorerProp & React.HTMLAttributes<HTMLDivElement>) {
  const [isAddingFile, setIsAddingFile] = useState(false);
  const [newPath, setNewPath] = useState("");
  const ref = useClickOutside(() => setIsAddingFile(false));

  const { sandpack, listen } = useSandpack();
  const {
    status,
    updateFile,
    deleteFile,
    activeFile,
    files,
    openFile,
    visibleFilesFromProps,
    addFile
  } = sandpack;

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
          isAddingFile={isAddingFile}
          setIsAddingFile={setIsAddingFile}
          setNewPath={setNewPath}
        />
      </div>
      <div className="fileExplorer__actions">
        <div className="fileExplorer__add" ref={ref}>
          {isAddingFile && (
            <input
              type="text"
              value={newPath}
              className="fileExplorer__input"
              onInput={(e) => {
                setNewPath(e.currentTarget.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addFile(newPath, "", true);
                  setNewPath("");
                  setIsAddingFile(false);
                }
              }}
            />
          )}
          <button className="fileExplorer__action" onClick={() => setIsAddingFile(!isAddingFile)}>
            <Svg id="create" />
          </button>
        </div>
      </div>
    </div>
  );
}
