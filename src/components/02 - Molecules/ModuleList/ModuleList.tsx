import { File } from "@/components/01 - Atoms/File/File";
import { Directory } from "@/components/01 - Atoms/Directory/Directory";
import { fromPropsToModules } from "@/utils/utils";
import "./ModuleList.scss";

export default function ModuleList({
  depth = 0,
  activeFile,
  selectFile,
  prefixedPath,
  files,
  autoHiddenFiles,
  visibleFiles,
  initialCollapsedFolder,
  isAddingFile,
  setIsAddingFile,
  setNewPath
}: any) {
  const { directories, modules } = fromPropsToModules({
    visibleFiles,
    autoHiddenFiles,
    prefixedPath,
    files
  });

  return (
    <div className="moduleList">
      {directories.map((dir) => (
        <Directory
          key={dir}
          activeFile={activeFile}
          autoHiddenFiles={autoHiddenFiles}
          depth={depth}
          files={files}
          initialCollapsedFolder={initialCollapsedFolder}
          prefixedPath={dir}
          selectFile={selectFile}
          visibleFiles={visibleFiles}
          isAddingFile={isAddingFile}
          setIsAddingFile={setIsAddingFile}
          setNewPath={setNewPath}
        />
      ))}

      {modules.map((file) => (
        <File
          key={file}
          active={activeFile === file}
          depth={depth}
          path={file}
          selectFile={selectFile}
        />
      ))}
    </div>
  );
}
