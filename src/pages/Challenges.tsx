import Label from "@/components/01 - Atoms/Label/Label";
import Search from "@/components/01 - Atoms/Search/Search";
import Tooltip from "@/components/01 - Atoms/Tooltip/Tooltip";
import ColoredLine from "@/components/02 - Molecules/ColoredLine/ColoredLine";
import Multiselect from "@/components/02 - Molecules/Multiselect/Multiselect";
import Tags from "@/components/02 - Molecules/Tags/Tags";
import PageTransition from "@/components/04 - Templates/PageTransition/PageTransition";
import { ThemesContext } from "@/contexts/ThemesContext";
import { useContext } from "react";

export default function Challenges() {

  const { mainColor } = useContext(ThemesContext)

  return (
    <PageTransition>

      <ColoredLine
        theme={mainColor}
        headContent={
          <>
            <Label name="type" className="gc-1to2 gr-1">type</Label>
            <Multiselect theme={"primary"} multiple={false} className="gc-1to2 gr-2" options={[]} />

            <Label name="search" className="gc-2to4 gr-1">search</Label>
            <Search placeholder={"Type something here..."} className="gc-2to4 gr-2" />

            <Label name="filter" className="gc-4to7 gr-1">Filter by</Label>
            <Multiselect theme={"primary"} searchable={true} defaultText="Technologies, sketch format, level" className="gc-4to7 gr-2" options={[]} />

            <Label name="sort" className="gc-7to8 gr-1">Sort by</Label>
            <Multiselect theme={"primary"} multiple={false} className="gc-7to8 gr-2" options={[
              {
                value: 'ASC',
                label: 'Latest',
                default: true
              }
            ]} />
          </>
        }
      >
        <div className="coloredLine__content__container">
          <Tags tags={[
            {
              label: "HTML",
              theme: "success"
            }
          ]} />
          <div className="coloredLine__indications">
            <p>About our challenges categories</p>
            <Tooltip theme="primary">test</Tooltip>
          </div>
        </div>

      </ColoredLine>

    </PageTransition>
  );
}
