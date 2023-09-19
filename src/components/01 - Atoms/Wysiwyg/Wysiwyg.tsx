import { Editor } from "@tinymce/tinymce-react";

export interface IWysiwyg {
  callback: Function;
}

export default function Wysiwyg({ callback }: IWysiwyg) {
  return (
    <Editor
      onEditorChange={(description: any) => {
        callback(description);
      }}
      apiKey={import.meta.env.VITE_TINY}
      init={{
        max_height: 400,
        height: 200,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount"
        ],
        toolbar:
          "undo redo | formatselect | " +
          "bold italic backcolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }"
      }}
    />
  );
}
