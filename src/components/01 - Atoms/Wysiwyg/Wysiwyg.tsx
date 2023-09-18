import { Editor } from "@tinymce/tinymce-react";
import "./Wysiwyg.scss";
import { ReactNode } from "react";
import { Theme } from "@/types/Theme";
import clsx from "clsx";

export interface IWysiwyg {
  callback: Function;
  value: string;
  children?: ReactNode;
  maxHeight?: number;
  placeholder?: string;
  color?: Theme;
}

export default function Wysiwyg({ callback, value, children, maxHeight = 400, placeholder, color = "light" }: IWysiwyg) {
  return (
    <div className={clsx('wysiwyg', `wysiwyg--${color}`)}>
      <Editor
        onEditorChange={(description: any) => {
          callback(description);
        }}
        value={value}
        apiKey={import.meta.env.VITE_TINY}
        init={{
          max_height: maxHeight,
          height: 200,
          menubar: false,
          placeholder: placeholder,
          plugins: [
            "advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor",
            "searchreplace", "visualblocks", "code", "fullscreen", "codesample",
            "insertdatetime", "media", "table", "help", "wordcount"
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "codesample | removeformat | help",
          content_style: "body { font-family:Roboto,Arial,sans-serif; font-size:16px }"
        }}
      />
      <div className="wysiwyg__absolute">
        {children}
      </div>
    </div>
  );
}
