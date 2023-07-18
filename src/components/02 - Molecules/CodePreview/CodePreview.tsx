import { useCallback } from "react";
import { SandpackPreview, useSandpack } from "@codesandbox/sandpack-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import "./CodePreview.scss";

export default function CodePreview() {
  const { sandpack } = useSandpack();

  const downloadProjectAsZip = useCallback(() => {
    const zip = new JSZip();
    const project = zip.folder("project")!;

    // Ajoutez les fichiers à l'archive zip
    Object.entries(sandpack.files).forEach(([filename, content]) => {
      project.file(filename, content.code);
    });

    project.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "maquequette.zip");
    });
  }, []);

  return (
    <SandpackPreview
      showNavigator={true}
      showRefreshButton={true}
      showOpenInCodeSandbox={false}
      showOpenNewtab={true}
      showRestartButton={true}
      actionsChildren={
        <button className="preview__dl" onClick={() => downloadProjectAsZip()}>
          <Svg id="upload" />
        </button>
      }
    />
  );
}
