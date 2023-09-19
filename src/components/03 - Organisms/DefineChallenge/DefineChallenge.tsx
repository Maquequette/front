import { useCallback, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import MultiStepsForm from "@/components/02 - Molecules/MultiStepsForm/MultiStepsForm";
import Label from "@/components/01 - Atoms/Label/Label";
import Multiselect from "@/components/02 - Molecules/Multiselect/Multiselect";
import Input from "@/components/01 - Atoms/Input/Input";
import Tags from "@/components/02 - Molecules/Tags/Tags";
import {
  getTagFamilies,
  getDifficulties,
  getChallengeTypes,
  postChallenge
} from "@/services/challenges.service";
import Heading from "@/components/01 - Atoms/Heading/Heading";
import "./DefineChallenge.scss";
import Wysiwyg from "@/components/01 - Atoms/Wysiwyg/Wysiwyg";
import FileInput from "@/components/01 - Atoms/FileInput/FileInput";

export default function DefineChallenge({ Dismiss }: any) {
  const { t } = useTranslation();

  const [query, setQuery] = useState<any>({
    "tags[]": [],
    type: 1,
    difficulty: undefined,
    title: "",
    resources: [],
    description: "",
    figmaURL: ""
  });

  const { data: difficulties } = useQuery(["difficulties__all"], () =>
    getDifficulties({ paginate: false })
  );
  const { data: tagFamilies } = useQuery(["tagFamilies__all"], () =>
    getTagFamilies({ paginate: false })
  );

  const { data: type } = useQuery(["type__all"], () => getChallengeTypes({ paginate: false }));

  const subTitles: Array<string> = ["1. DEFINE", "2. DESCRIBE", "3. COMPLETE"];
  const [currentSubTitle, setCurrentSubTitle] = useState<string>(subTitles[0]);

  const { mutate: addChallenge } = useMutation(postChallenge);

  const picturesToResources = (files: FileList) => {
    const fileArray: Array<any> = [];
    Array.from(files).forEach((element: any, index) => {
      fileArray.push({
        'value': element,
        'type': "image"
      });
    });
    return fileArray.concat(query.resources);
  }

  const handleSubmit = useCallback(() => {
    const form = new FormData();

    Object.entries(query).map(([key, val]: any) => {

      if (key.includes("[]")) {
        Array.from(val).forEach((element: any) => {
          form.append(key, element.id);
        });

      } else if (key === "resources") {
        Array.from(val).forEach((element: any, index) => {
          form.append(`${key}[${index}][value]`, element.value);
          form.append(`${key}[${index}][type]`, element.type);
        })

      } else if (key === "figmaURL" && val) {
        form.append(`${key}[${query.resources.length}][value]`, val);
        form.append(`${key}[${query.resources.length}][type]`, "url");
        form.append(`${key}[${query.resources.length}][label]`, "figmaURL");

      } else {
        form.append(key, val);
      }
    });

    addChallenge(form);
    setQuery({
      categories: 1,
      tags: undefined,
      type: 1,
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
      <div>
        <Heading tag="h1" level="secondary">
          {t("Create a challenge")}
        </Heading>
        <p className="login__subtitle">
          {t(currentSubTitle)}
        </p>
      </div>

      <MultiStepsForm
        handleSubmit={handleSubmit}
        onStepChange={(currentStep: number) => setCurrentSubTitle(subTitles[currentStep])}
        steps={[
          {
            btnText: t("Continue"),
            stepSubmit: () => query.difficulty && query.type && query.title != "",
            formContent: (
              <div className="defineChallenge__form">

                {/* <div className="defineChallenge__full">
                  <Label name="type">{t("Type")}</Label>
                  <Multiselect
                    multiple={false}
                    callback={(value: any) => {
                      setQuery({ ...query, type: value[0]?.id });
                    }}
                    theme={"primary"}
                    searchable={true}
                    defaultText="Type"
                    options={type?.data ?? []}
                  />
                </div> */}

                <div className="defineChallenge__full">
                  <Label name="title" required={true}>
                    {t("Title")}
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

                <div className="defineChallenge__full">
                  <Label name="type">{t("Tags")}</Label>
                  <Multiselect
                    callback={(value: any) => {
                      setQuery({ ...query, "tags[]": value });
                    }}
                    theme={"primary"}
                    searchable={true}
                    defaultText="Select Tags"
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

                <div className="defineChallenge__full" style={{ marginTop: "1rem" }}>
                  <Tags tags={query["tags[]"]} />
                </div>

                <div className="defineChallenge__full">
                  <Label name="level" required={true}>
                    {t("Difficulties")}
                  </Label>
                  <Multiselect
                    multiple={false}
                    callback={(value: any) => {
                      setQuery({ ...query, difficulty: value[0]?.id });
                    }}
                    theme={"primary"}
                    searchable={true}
                    defaultText="Level"
                    options={difficulties?.data ?? []}
                  />
                </div>
              </div>
            )
          },
          {
            btnText: t("Continue"),
            stepSubmit: () => query.description && query.resources,
            formContent: (
              <div className="defineChallenge__form">

                <div className="defineChallenge__full">
                  <Label name="Description" required={true}>
                    {t("Description")}
                  </Label>
                  <Wysiwyg
                    callback={(value: any) => {
                      setQuery({ ...query, description: value });
                    }}
                  />
                </div>

                <div className="defineChallenge__full">
                  <Label name="picture" required={true}>
                    {t("Picture")}
                  </Label>
                  <FileInput
                    accept=".png, .jpg, .jpeg"
                    name="picture"
                    placeholder={t("Upload")}
                    required={true}
                    preview={true}
                    multiple={true}
                    limite={5}
                    icon="img"
                    instruction={t("2 MO maximum size \nupload up to 5 files : png/jpg")}
                    handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const files = e.currentTarget.files;
                      if (files) {
                        setQuery({ ...query, resources: picturesToResources(files) });
                      }
                    }}
                  />
                </div>
              </div>
            )
          },
          {
            btnText: t("Create !"),
            stepSubmit: () => query.description && query.resources,
            formContent: (
              <div className="defineChallenge__form">
                <div className="defineChallenge__full">
                  <Label name="zipfile">
                    {t("Additional Resources")}
                  </Label>
                  <FileInput
                    accept=".zip, .rar, .7zip"
                    name="zipfile"
                    placeholder={t("Upload")}
                    required={false}
                    preview={false}
                    multiple={false}
                    icon="folder"
                    instruction={t("2 MO maximum size \nupload unique zip folder : zip/rar")}
                    handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const file = e.currentTarget.files;
                      if (file) {
                        setQuery({
                          ...query, resources: [...query.resources, {
                            'value': file[0],
                            'type': "file"
                          }]
                        });
                      }
                    }}
                  />
                </div>

                <p className="login__subtitle" style={{ paddingTop: "2rem" }}>
                  {t("THE MORE THE BETTER...")}
                </p>

                <div className="defineChallenge__full">
                  <Label name="figma">
                    {t("Figma url")}
                  </Label>
                  <Input
                    type="url"
                    name="figma"
                    placeholder="figma.com/file/example..."
                    required={false}
                    value={query.figmaURL ?? ""}
                    handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setQuery({
                        ...query, figmaURL: e.target.value
                      });
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
