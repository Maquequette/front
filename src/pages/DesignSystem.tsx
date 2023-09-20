import Container from "@/components/01 - Atoms/Container/Container";
import Editor from "@/components/03 - Organisms/Editor/Editor";
import Image from "@/components/01 - Atoms/Image/Image";

export default function DesignSystem() {
  return (
    <Container center={true}>
      <Editor theme="dark" solo={true} hasSelect={true} />
    </Container>
  );
}
