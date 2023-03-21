import Button from "@/components/01 - Atoms/Button/Button";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import Select from "@/components/01 - Atoms/Select/Select";
import Multiselect from "@/components/03 - Organisms/Multiselect/Multiselect";
import useToasts from "@/hooks/useToasts";

export default function DesignSystem() {
  const { pushToast } = useToasts();
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
    </div>
  );
}
