import { useState } from "react";
import { File } from "../File/File";
import ModuleList from "@/components/02 - Molecules/ModuleList/ModuleList";
import "./Directory.scss";

export const Directory = ({
  prefixedPath,
  files,
  selectFile,
  activeFile,
  depth,
  autoHiddenFiles,
  visibleFiles,
  initialCollapsedFolder,
  isAddingFile,
  setIsAddingFile,
  setNewPath
}: any) => {
  const [open, setOpen] = useState(!initialCollapsedFolder?.includes(prefixedPath));

  const toggle = (): void => setOpen((prev) => !prev);

  return (
    <div className="directory">
      <File
        depth={depth}
        isDir={true}
        isDirOpen={open}
        onClick={toggle}
        path={prefixedPath + "/"}
        isAddingFile={isAddingFile}
        setIsAddingFile={setIsAddingFile}
        setNewPath={setNewPath}
      />

      {open && (
        <ModuleList
          activeFile={activeFile}
          autoHiddenFiles={autoHiddenFiles}
          depth={depth + 1}
          files={files}
          initialCollapsedFolder={initialCollapsedFolder}
          prefixedPath={prefixedPath}
          selectFile={selectFile}
          visibleFiles={visibleFiles}
        />
      )}
    </div>
  );
};
