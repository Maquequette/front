import { useCallback, useEffect, useState } from "react";
import { SandpackPreview, useSandpack } from "@codesandbox/sandpack-react";
import { Link, useLocation } from "react-router-dom";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import Dialog from "@/components/04 - Templates/Dialog/Dialog";
import { useMutation } from "@tanstack/react-query";
import { getAccessToken } from "@/services/git.service";
import Button from "@/components/01 - Atoms/Button/Button";
import Heading from "@/components/01 - Atoms/Heading/Heading";
import Input from "@/components/01 - Atoms/Input/Input";
import "./CodePreview.scss";

export interface ICodePreview {
  setFullScreen: (full: boolean) => void;
}

export default function CodePreview({ setFullScreen }: ICodePreview) {
  const { sandpack } = useSandpack();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: getGitHubToken } = useMutation(getAccessToken);

  const downloadProjectAsZip = useCallback(() => {
    const zip = new JSZip();
    const project = zip.folder("project") ?? false;

    if (project) {
      Object.entries(sandpack.files).forEach(([filename, content]) => {
        project.file(filename, content.code);
      });

      project.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, "Mac&Kate.zip");
      });
    }
  }, []);

  const uploadProjectFiles = (files: any) => {
    JSZip.loadAsync(files[0]).then(function (documents) {
      documents
        .filter((filePath, file) => {
          return !filePath.match(/^__MACOSX\//);
        })
        .forEach(async (file: any) => {
          const content = await file.async("string");
          if (content) {
            const path = file.name.split("/");
            path.shift();
            sandpack.updateFile("/".concat(path.join("/")), content, true);
          }
        });
    });
  };

  useEffect(() => {
    const codeParam: string | null = new URLSearchParams(location.search).get("code");
    if (location.hash === "#github" && codeParam) {
      getGitHubToken(codeParam);
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
            <button className="preview__dl" onClick={() => setIsModalOpen(!isModalOpen)}>
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
            <Dialog id="folder" visible={isModalOpen} Dismiss={() => setIsModalOpen(false)}>
              <div className="preview__dialog">
                <Heading tag="h3" level="tertiary">
                  Upload or Download source code
                </Heading>
                <div className="preview__dialog__body">
                  <Button theme="primary" handleClick={() => downloadProjectAsZip()}>
                    <Svg id="upload" />
                    Download files
                  </Button>
                  <Input
                    name="code_upload"
                    accept=".zip"
                    type="file"
                    required={true}
                    preview={true}
                    limite={5}
                    multiple={false}
                    handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const files = e.currentTarget.files;
                      uploadProjectFiles(files);
                    }}
                  />
                </div>
              </div>
            </Dialog>
          </>
        }
      />
    </>
  );
}
