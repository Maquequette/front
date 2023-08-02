import { SandpackCodeEditor } from "@codesandbox/sandpack-react";
import { abbreviationTracker } from "@emmetio/codemirror6-plugin";
import { searchKeymap, search } from "@codemirror/search";
import "./CodeEditor.scss";

export default function CodeEditor() {
  return (
    <SandpackCodeEditor
      showTabs
      showLineNumbers
      showInlineErrors
      wrapContent
      closableTabs
      extensionsKeymap={[...searchKeymap]}
      extensions={[abbreviationTracker(), search()]}
      className="editor__code"
    />
  );
}
