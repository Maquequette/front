import Container from "@/components/01 - Atoms/Container/Container";
import Editor from "@/components/03 - Organisms/Editor/Editor";
export default function DesignSystem() {
  return (
    <Container center={true}>
      <Editor template="react" theme="dark" roomId="natho" />
    </Container>
  );
}
