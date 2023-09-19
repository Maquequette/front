import { memo } from "react";
import Editor from "../Editor/Editor";

export default memo(function SolutionCode() {
    return (
        <Editor template={"static"} theme={"dark"} solo={true}></Editor>
    );
})