import { useCallback, useEffect, useState } from "react";
import { SandpackPreview, useSandpack } from "@codesandbox/sandpack-react";
import { Link, useLocation } from "react-router-dom";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import Dialog from "@/components/04 - Templates/Dialog/Dialog";
import "./CodePreview.scss";
import { useMutation } from "@tanstack/react-query";
import { getAccessToken } from "@/services/git.service";

export interface ICodePreview {
  setFullScreen: Function;
}

export default function CodePreview({ setFullScreen }: ICodePreview) {
  const { sandpack } = useSandpack();
  const location = useLocation();
  const [isGithub, setIsGithub] = useState(false);
  const { mutate: getGitHubToken } = useMutation(getAccessToken);

  const downloadProjectAsZip = useCallback(() => {
    const zip = new JSZip();
    const project = zip.folder("project")!;

    Object.entries(sandpack.files).forEach(([filename, content]) => {
      project.file(filename, content.code);
    });

    project.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "maquequette.zip");
    });
  }, []);

  useEffect(() => {
    const code_param: string | null = new URLSearchParams(location.search).get("code");
    if (location.hash === "#github" && code_param) {
      getGitHubToken(code_param);
    }
  }, [location]);

  return (
    <>
      <SandpackPreview
        showNavigator={true}
        showRefreshButton={true}
        showOpenInCodeSandbox={false}
        showOpenNewtab={true}
        showRestartButton={true}
        actionsChildren={
          <>
            <button className="preview__dl" onClick={() => downloadProjectAsZip()}>
              <Svg id="upload" />
            </button>
            <Link
              className="preview__github"
              to={`https://github.com/login/oauth/authorize?client_id=${
                import.meta.env.VITE_GITHUB_CLIENT_ID
              }&redirect_uri=${import.meta.env.VITE_FRONTEND_URL + location.pathname}#github`}>
              <Svg id="github" />
            </Link>
            <button className="preview__fullscreen" onClick={() => setFullScreen(true)}>
              <Svg id="fullscreen" />
            </button>
          </>
        }
      />
      <Dialog id="github" visible={isGithub} Dismiss={() => setIsGithub(false)}>
        <p>pp</p>
      </Dialog>
    </>
  );
}
