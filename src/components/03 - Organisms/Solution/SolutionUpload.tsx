import FileInput from "@/components/01 - Atoms/FileInput/FileInput";
import Input from "@/components/01 - Atoms/Input/Input";
import Label from "@/components/01 - Atoms/Label/Label";
import Wysiwyg from "@/components/01 - Atoms/Wysiwyg/Wysiwyg";
import Grid from "@/components/02 - Molecules/Grid/Grid";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import "./SolutionUpload.scss";

export default memo(function SolutionUpload() {
    const { t } = useTranslation();

    return (
        <div className="defineSolution">
            <Grid size={"45%"}>
                <div className="defineSolution__full">
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
                            //const file = e.currentTarget.files;
                            // if (file) {
                            //     setQuery({
                            //         ...query, resources: [...query.resources, {
                            //             'value': file[0],
                            //             'type': "file"
                            //         }]
                            //     });
                            // }
                        }}
                    />
                </div>
                <div className="defineSolution__full">
                    <Label name="figma">
                        {t("Figma url")}
                    </Label>
                    <Input
                        type="url"
                        name="figma"
                        placeholder="figma.com/file/example..."
                        required={false}
                        value={""}
                        handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            // setQuery({
                            //     ...query, figmaURL: e.target.value
                            // });
                        }}
                    />
                </div>
                <div className="defineSolution__full">
                    <Label name="Description" required={false}>
                        {t("Description")}
                    </Label>
                    <Wysiwyg
                        callback={(value: any) => {
                            //setQuery({ ...query, description: value });
                        }}
                        value={""}
                        placeholder={t("My solution brief that I want to share with everyone...")}
                    />
                </div>
            </Grid>
        </div>

    );
})