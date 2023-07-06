import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Editor } from "@tinymce/tinymce-react";
import MultiStepsForm from "@/components/02 - Molecules/MultiStepsForm/MultiStepsForm";
import Label from "@/components/01 - Atoms/Label/Label";
import Multiselect from "@/components/02 - Molecules/Multiselect/Multiselect";
import Input from "@/components/01 - Atoms/Input/Input";
import Tags from "@/components/02 - Molecules/Tags/Tags";
import {
  getTagFamilies,
  getCategories,
  getDifficulties,
  getChallengeTypes
} from "@/services/challenges.service";
import Heading from "@/components/01 - Atoms/Heading/Heading";
import "./DefineChallenge.scss";

export default function DefineChallenge() {
  const [query, setQuery] = useState({
    categories: undefined,
    tags: undefined,
    type: undefined,
    difficulties: undefined,
    title: ""
  });
  const { data: categories } = useQuery(["categories__all"], () =>
    getCategories({ paginate: false })
  );
  const { data: difficulties } = useQuery(["difficulties__all"], () =>
    getDifficulties({ paginate: false })
  );
  const { data: tagFamilies } = useQuery(["tagFamilies__all"], () =>
    getTagFamilies({ paginate: false })
  );

  const { data: type } = useQuery(["type__all"], () => getChallengeTypes({ paginate: false }));

  return (
    <div className="defineChallenge">
      <Heading level="tertiary" tag="h4">
        Create a challenge
      </Heading>
      <MultiStepsForm
        handleSubmit={() => {}}
        steps={[
          {
            btnText: "Continue !",
            stepSubmit: () => query.categories && query.difficulties && query.type,
            formContent: (
              <div className="defineChallenge__form">
                <div>
                  <Label name="filter">Categories</Label>
                  <Multiselect
                    callback={(value: any) => {
                      setQuery({ ...query, categories: value });
                    }}
                    theme={"primary"}
                    searchable={true}
                    defaultText="Categories"
                    options={categories?.data ?? []}
                  />
                </div>
                <div>
                  <Label name="type">Type</Label>
                  <Multiselect
                    callback={(value: any) => {
                      setQuery({ ...query, type: value });
                    }}
                    theme={"primary"}
                    searchable={true}
                    defaultText="Type"
                    options={type?.data ?? []}
                  />
                </div>
                <div className="defineChallenge__full">
                  <Label name="title" required={true}>
                    Title
                  </Label>
                  <Input
                    type="text"
                    name="title"
                    placeholder="My challenge title"
                    required={true}
                    value={query.title ?? ""}
                    handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setQuery({ ...query, title: e.target.value });
                    }}
                  />
                </div>
                <div>
                  <Label name="type">Tag</Label>
                  <Multiselect
                    callback={(value: any) => {
                      setQuery({ ...query, tags: value });
                    }}
                    theme={"primary"}
                    searchable={true}
                    defaultText="Tag"
                    options={
                      tagFamilies?.data.map((family: any) => {
                        return {
                          label: family.label,
                          children: family.tags
                        };
                      }) ?? []
                    }
                  />
                </div>
                <div>
                  <Label name="level">Difficulties</Label>
                  <Multiselect
                    callback={(value: any) => {
                      setQuery({ ...query, difficulties: value });
                    }}
                    theme={"primary"}
                    searchable={true}
                    defaultText="Level"
                    options={difficulties?.data ?? []}
                  />
                </div>
                <div className="defineChallenge__full">
                  <Tags tags={query?.tags} />
                </div>
              </div>
            )
          },
          {
            btnText: "Create challenge !",
            stepSubmit: () => true,
            formContent: (
              <div className="defineChallenge__form">
                <div className="defineChallenge__full">
                  <Label name="firstName" required={true}>
                    Description
                  </Label>
                  <Editor
                    onEditorChange={() => {}}
                    apiKey={import.meta.env.VITE_TINY}
                    init={{
                      height: 500,
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
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:1.4rem }"
                    }}
                  />
                </div>
                <div className="defineChallenge__full">
                  <Label name="picture" required={true}>
                    Picture
                  </Label>
                  <Input
                    accept=".png, .jpg, .jpeg"
                    type="file"
                    name="picture"
                    required={true}
                    preview={true}
                    limite={5}
                    multiple={true}
                    handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      // const file = Object(e.currentTarget.files)[0];
                      // console.log(file);
                      //setLastName(e.target.value);
                    }}
                  />
                </div>
              </div>
            )
          }
        ]}
      />
    </div>
  );
}
