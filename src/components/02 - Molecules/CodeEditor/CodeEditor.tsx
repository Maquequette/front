import { MutableRefObject, useEffect } from "react";
import { SandpackCodeEditor, useActiveCode, useSandpack } from "@codesandbox/sandpack-react";
import { yCollab } from "y-codemirror.next";
import * as Y from "yjs";
import { abbreviationTracker } from "@emmetio/codemirror6-plugin";
import { WebsocketProvider } from "y-websocket";

export interface ICode {
  ytext?: Y.Text;
  provider?: WebsocketProvider;
  undoManager?: Y.UndoManager;
}
export default function CodeEditor({ ytext, provider, undoManager }: ICode) {
  const { updateCode, code } = useActiveCode();
  const { sandpack } = useSandpack();

  // useEffect(() => {
  //   sandpack.files;

  //   //ytext.insert(0, code);
  //   //updateCode(ytext.toString(), true);
  // }, []);

  return (
    <SandpackCodeEditor
      showTabs
      showLineNumbers
      showInlineErrors
      wrapContent
      closableTabs
      extensions={[abbreviationTracker()]}
    />
  );
}

// yCollab(ytext, provider.awareness, { undoManager });
