import Button from "@/components/01 - Atoms/Button/Button";
import Container from "@/components/01 - Atoms/Container/Container";
import Label from "@/components/01 - Atoms/Label/Label";
import Search from "@/components/01 - Atoms/Search/Search";
import Tooltip from "@/components/01 - Atoms/Tooltip/Tooltip";
import ColoredLine from "@/components/02 - Molecules/ColoredLine/Filters";
import Multiselect from "@/components/02 - Molecules/Multiselect/Multiselect";
import Tags from "@/components/02 - Molecules/Tags/Tags";
import PageTransition from "@/components/04 - Templates/PageTransition/PageTransition";
import { ThemesContext } from "@/contexts/ThemesContext";
import { useContext } from "react";

export default function Challenges() {
  const { mainColor } = useContext(ThemesContext);

  return (
    <PageTransition>
      <ColoredLine
        theme={mainColor}
        headContent={
          <>
            <Label name="type">type</Label>
            <Multiselect theme={"primary"} multiple={false} options={[]} />
            <Label name="search">search</Label>
            <Search placeholder={"Type something here..."} />
            <Label name="filter">Filter by</Label>
            <Multiselect
              theme={"primary"}
              searchable={true}
              defaultText="Technologies, sketch format, level"
              options={[
                {
                  value: null,
                  label: "levels",
                  children: [
                    {
                      value: 1,
                      label: "Moldu"
                    },
                    {
                      value: 2,
                      label: "Apprenti Sorcier"
                    }
                  ]
                }
              ]}
            />
            <Label name="sort">Sort by</Label>
            <Multiselect
              theme={"primary"}
              multiple={false}
              options={[
                {
                  value: "ASC",
                  label: "Latest",
                  default: true
                }
              ]}
            />
          </>
        }>
        <div className="coloredLine__content__container">
          <Tags
            tags={[
              {
                label: "HTML",
                theme: "success"
              }
            ]}
          />
          <div className="coloredLine__indications">
            <p>About our challenges categories</p>
            <Tooltip theme="primary">test</Tooltip>
          </div>
        </div>
      </ColoredLine>

      <Container>
        <div>
          <Button theme={"primary"}>Create</Button>
        </div>
      </Container>
    </PageTransition>
  );
}
