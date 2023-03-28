import Button from "@/components/01 - Atoms/Button/Button";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import Select from "@/components/01 - Atoms/Select/Select";
import Multiselect from "@/components/03 - Organisms/Multiselect/Multiselect";
import useToasts from "@/hooks/useToasts";
import Dialog from "@/components/04 - Templates/Dialog/Dialog";
import Tabs from "@/components/03 - Organisms/Tabs/Tabs";
import { useState } from "react";

export default function DesignSystem() {
  const { pushToast } = useToasts();
  const [dialog, setDialog] = useState<boolean>(false);

  return (
    <div style={{ marginTop: "3rem", marginLeft: "3rem" }}>
      <Multiselect
        theme="primary"
        options={[
          { label: "Test", value: "value" },
          { label: "titre", value: null },
          { label: "Test2", value: "value2" },
          { label: "Test3", value: "value3" },
          { label: "Test3", value: "value4" }
        ]}
      />

      <Button
        theme="primary"
        handleClick={() => {
          //pushToast({ title: "oui", desc: "PIOUI", theme: "primary", duration: 10 })
          setDialog(!dialog)
        }}>
        <Svg id="arrow"></Svg>
        DesignSystem
      </Button>

      <Dialog
        id="test"
        visible={dialog}
        Dismiss={() => setDialog(!dialog)}
      >

        <Tabs tabs={[
          {
            tabTitle: 'test',
            tabContent:
              <Button theme="primary">
                bro la meuf la jla baise
              </Button>
          },
          {
            tabTitle: 'test2',
            tabContent:
              <Button theme="primary">
                piou piou
              </Button>
          },
          {
            tabTitle: 'caca',
            tabContent:
              <Button theme="primary">
                j'adore jouer avec mon caca
              </Button>
          }
        ]} />

      </Dialog>
    </div>
  );
}
