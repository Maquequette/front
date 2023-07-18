import { useSandpack } from "@codesandbox/sandpack-react";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import "./File.scss";
import { useState } from "react";

export interface IFile {
  path: string;
  selectFile?: (path: string) => void;
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  depth: number;
  isDirOpen?: boolean;
  isDir?: boolean;
}

export const File: React.FC<IFile> = ({
  selectFile,
  path,
  active,
  onClick,
  depth,
  isDirOpen,
  isDir = false
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentPath, setCurrentPath] = useState(path);
  const { sandpack } = useSandpack();
  const { deleteFile, updateFile, files, activeFile } = sandpack;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (selectFile) {
      selectFile(path);
    }
    onClick?.(event);
  };

  const handleEditing = (): void => {
    setIsUpdating(!isUpdating);
  };

  const fileName = path.split("/").filter(Boolean).pop();

  const getIcon = (): JSX.Element => {
    if (selectFile) return <Svg id="file" />;
    return isDirOpen ? <Svg id="directory--open" /> : <Svg id="directory--closed" />;
  };

  return (
    <div className="file">
      {!isUpdating ? (
        <button
          className="file__btn"
          data-active={active}
          onClick={handleClick}
          onDoubleClick={handleEditing}
          style={{ paddingLeft: 18 * depth + "px" }}
          title={fileName}
          type="button">
          {getIcon()}
          <span>{fileName}</span>
        </button>
      ) : (
        <input
          type="text"
          value={currentPath}
          onInput={(e) => setCurrentPath(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateFile(currentPath, files[activeFile].code, true);
              deleteFile(path);
              handleEditing();
            }
          }}
        />
      )}

      {!isDir && (
        <div className="file__delete" onClick={() => deleteFile(path)}>
          <Svg id="cross" />
        </div>
      )}
    </div>
  );
};
