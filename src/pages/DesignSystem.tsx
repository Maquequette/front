import Button from "@/components/01 - Atoms/Button/Button";
import Svg from "@/components/01 - Atoms/Svg/Svg";
export default function DesignSystem() {
  return (
    <div style={{ marginTop: "3rem", marginLeft: "3rem" }}>
      <Button theme="primary">
        <Svg id="arrow"></Svg>
        DesignSystem
      </Button>
    </div>
  );
}
