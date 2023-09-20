import { memo } from "react";
import Editor from "@/components/03 - Organisms/Editor/Editor";

export default memo(function SolutionCode() {
  return <Editor hasSelect={true} theme={"dark"} solo={true} />;
});
