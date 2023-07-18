import { useSandpack } from "@codesandbox/sandpack-react";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import "./File.scss";

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
  const {
    sandpack: { deleteFile }
  } = useSandpack();

  const onClickButton = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (selectFile) {
      selectFile(path);
    }
    onClick?.(event);
  };

  const fileName = path.split("/").filter(Boolean).pop();

  const getIcon = (): JSX.Element => {
    if (selectFile) return <Svg id="file" />;
    return isDirOpen ? <Svg id="directory--open" /> : <Svg id="directory--closed" />;
  };

  return (
    <div className="file">
      <button
        className="file__btn"
        data-active={active}
        onClick={onClickButton}
        style={{ paddingLeft: 18 * depth + "px" }}
        title={fileName}
        type="button">
        {getIcon()}
        <span>{fileName}</span>
      </button>
      {!isDir && (
        <div className="file__delete" onClick={() => deleteFile(path)}>
          <Svg id="cross" />
        </div>
      )}
    </div>
  );
};
