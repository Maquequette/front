import { useCallback, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import MultiStepsForm from "@/components/02 - Molecules/MultiStepsForm/MultiStepsForm";
import Label from "@/components/01 - Atoms/Label/Label";
import Multiselect from "@/components/02 - Molecules/Multiselect/Multiselect";
import Input from "@/components/01 - Atoms/Input/Input";
import Tags from "@/components/02 - Molecules/Tags/Tags";
import {
  getTagFamilies,
  getCategories,
  getDifficulties,
  getChallengeTypes,
  postChallenge
} from "@/services/challenges.service";
import Heading from "@/components/01 - Atoms/Heading/Heading";
import "./DefineChallenge.scss";
import Wysiwyg from "@/components/01 - Atoms/Wysiwyg/Wysiwyg";

export default function DefineChallenge({ Dismiss }: any) {
  const [query, setQuery] = useState<any>({
    categories: undefined,
    tags: undefined,
    type: undefined,
    difficulty: undefined,
    title: "",
    files: null,
    url: "",
    description: "",
    additional: null
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

  const { mutate: addChallenge } = useMutation(postChallenge);

  const handleSubmit = useCallback(() => {
    const form = new FormData();

    Object.entries(query).map(([key, val]: any) => {
      if (typeof val === "object" && key !== "files") {
        Array.from(val).forEach((element: any) => {
          form.append(key, element.id);
        });
      } else {
        form.append(key, val);
      }
    });

    addChallenge(form);
    setQuery({
      categories: undefined,
      tags: undefined,
      type: undefined,
      difficulty: undefined,
      title: "",
      files: null,
      url: "",
      description: "",
      additional: null
    });
    Dismiss();
  }, [query]);

  return (
    <div className="defineChallenge">
      <Heading level="tertiary" tag="h4">
        Create a challenge
      </Heading>
      <MultiStepsForm
        handleSubmit={handleSubmit}
        steps={[
          {
            btnText: "Continue !",
            stepSubmit: () => query.categories && query.difficulty && query.type,
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
                      setQuery({ ...query, difficulty: value });
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
            btnText: "You close to make something awesome",
            stepSubmit: () => query.description && query.files,
            formContent: (
              <div className="defineChallenge__form">
                <div className="defineChallenge__full">
                  <Label name="firstName" required={true}>
                    Description
                  </Label>
                  <Wysiwyg
                    callback={(value: any) => {
                      setQuery({ ...query, description: value });
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
                      const files = e.currentTarget.files?.[0];
                      if (files) {
                        setQuery({ ...query, files });
                      }
                    }}
                  />
                </div>
              </div>
            )
          },
          {
            btnText: "Finito",
            stepSubmit: () => true,
            formContent: (
              <div className="defineChallenge__form">
                <div className="defineChallenge__full">
                  <Label name="picture" required={true}>
                    Additionnal Ressource
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
                      const additional = e.currentTarget.files?.[0];
                      if (additional) {
                        setQuery({ ...query, additional });
                      }
                    }}
                  />
                </div>
                <div className="defineChallenge__full">
                  <Label name="picture" required={true}>
                    Additionnal Ressource
                  </Label>
                  <Input
                    type="url"
                    name="figma"
                    required={true}
                    handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const url = e.target.value;
                      setQuery({ ...query, url });
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
