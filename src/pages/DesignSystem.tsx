import Container from "@/components/01 - Atoms/Container/Container";
import Editor from "@/components/03 - Organisms/Editor/Editor";
import Image from "@/components/01 - Atoms/Image/Image";

export default function DesignSystem() {
  return (
    <Container center={true}>
      {/* <Editor template="react" theme="dark" roomId="natho" /> */}
      <Image
        alt="oui"
        height="500"
        width="1000"
        src="https://res.cloudinary.com/dz209s6jk/image/upload/v1668186598/Challenges/txrtsxgbdjxjwamhysxx.jpg"
      />
    </Container>
  );
}
