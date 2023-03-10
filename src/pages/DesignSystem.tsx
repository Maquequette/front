import Button from "@/components/01 - Atoms/Button/Button";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import Select from "@/components/01 - Atoms/Select/Select";

export default function DesignSystem() {
  return (
    <div style={{ marginTop: "3rem", marginLeft: "3rem" }}>
      <Button theme="primary">
        <Svg id="arrow"></Svg>
        DesignSystem
      </Button>
      <Select
        options={[
          {
            label: "React",
            value: "react"
          },
          {
            label: "Vue",
            value: "vue"
          },
          {
            label: "Angular",
            value: "angular"
          }
        ]}
      />
    </div>
  );
}
