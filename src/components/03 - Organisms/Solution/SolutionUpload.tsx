import FileInput from "@/components/01 - Atoms/FileInput/FileInput";
import Input from "@/components/01 - Atoms/Input/Input";
import Label from "@/components/01 - Atoms/Label/Label";
import Wysiwyg from "@/components/01 - Atoms/Wysiwyg/Wysiwyg";
import Grid from "@/components/02 - Molecules/Grid/Grid";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import "./SolutionUpload.scss";

export interface ISolutionUpload {
    handleFile: Function,
    url: string,
    handleUrl: Function,
    recap: string,
    handleRecap: Function
}


export default memo(function SolutionUpload({ handleFile, url, handleUrl, recap, handleRecap }: ISolutionUpload) {
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
                            handleFile(e);
                        }}
                    />
                </div>
                <div className="defineSolution__full">
                    <Label name="github">
                        {t("Repository url")}
                    </Label>
                    <Input
                        type="url"
                        name="github"
                        placeholder="https://github.com/Example..."
                        required={false}
                        value={url}
                        handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            handleUrl(e.target.value);
                        }}
                    />
                </div>
                <div className="defineSolution__full" style={{ gridColumn: 'span 2' }}>
                    <Label name="Description" required={false}>
                        {t("Description")}
                    </Label>
                    <Wysiwyg
                        callback={(value: any) => {
                            handleRecap(value);
                        }}
                        value={recap}
                        placeholder={t("My solution brief that I want to share with everyone...")}
                    />
                </div>
            </Grid>
        </div>
    );
})