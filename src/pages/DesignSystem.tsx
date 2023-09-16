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
        src="https://www.programme-tv.net/imgre/fit/~1~tel~2023~05~16~60c36afc-95a1-4915-a905-9a34e1379499.jpeg/1200x600/crop-from/top/quality/80/focus-point/587,365/star-wars-dans-quel-ordre-chronologique-regarder-les-films-et-series-sur-disney.jpg"
      />
    </Container>
  );
}
