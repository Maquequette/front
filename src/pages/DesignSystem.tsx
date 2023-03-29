import Grid from "@/components/02 -  Molecules/Grid/Grid";
import Card from "@/components/03 - Organisms/Card/Card";
import Container from "@/components/01 - Atoms/Container/Container";
export default function DesignSystem() {
  return (
    <div style={{ marginTop: "3rem", marginLeft: "3rem" }}>
      <Container center={true}>
        <Grid>
          <Card
            tags={[
              { label: "HTML", theme: "primary" },
              { label: "CSS", theme: "secondary" },
              { label: "JS", theme: "success" },
              { label: "PHP", theme: "danger" },
              { label: "JAVA", theme: "warn" },
              { label: "HTML", theme: "primary" },
              { label: "CSS", theme: "secondary" },
              { label: "JS", theme: "success" },
              { label: "PHP", theme: "danger" },
              { label: "JAVA", theme: "warn" }
            ]}
            price={{ value: "10", currency: "EUR" }}
            author="John Doe Mino"
            date={Date.now()}
            title="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi nulla eos magnam harum sapiente aut laboriosam commodi"
            img="https://media.istockphoto.com/id/1199486942/fr/photo/dr%C3%B4le-merci-carte-baiser-avec-des-animaux.jpg?s=1024x1024&w=is&k=20&c=ew-DCfMHG9cs9qppUkJfc80bRUZ1x278THFeCTNpml4="
          />
          <Card
            tags={[
              { label: "HTML", theme: "primary" },
              { label: "CSS", theme: "accent" }
            ]}
            price={{ value: "10", currency: "EUR" }}
            author="John Doe Mino"
            date={Date.now()}
            title="oui"
            img="https://media.istockphoto.com/id/1199486942/fr/photo/dr%C3%B4le-merci-carte-baiser-avec-des-animaux.jpg?s=1024x1024&w=is&k=20&c=ew-DCfMHG9cs9qppUkJfc80bRUZ1x278THFeCTNpml4="
          />
          <Card
            tags={[
              { label: "HTML", theme: "primary" },
              { label: "CSS", theme: "accent" }
            ]}
            price={{ value: "10", currency: "EUR" }}
            author="John Doe Mino"
            date={Date.now()}
            title="oui"
            img="https://media.istockphoto.com/id/1199486942/fr/photo/dr%C3%B4le-merci-carte-baiser-avec-des-animaux.jpg?s=1024x1024&w=is&k=20&c=ew-DCfMHG9cs9qppUkJfc80bRUZ1x278THFeCTNpml4="
          />
          <Card
            tags={[
              { label: "HTML", theme: "primary" },
              { label: "CSS", theme: "accent" }
            ]}
            price={{ value: "10", currency: "EUR" }}
            author="John Doe Mino"
            date={Date.now()}
            title="oui"
            img="https://media.istockphoto.com/id/1199486942/fr/photo/dr%C3%B4le-merci-carte-baiser-avec-des-animaux.jpg?s=1024x1024&w=is&k=20&c=ew-DCfMHG9cs9qppUkJfc80bRUZ1x278THFeCTNpml4="
          />
          <Card
            tags={[
              { label: "HTML", theme: "primary" },
              { label: "CSS", theme: "accent" }
            ]}
            price={{ value: "10", currency: "EUR" }}
            author="John Doe Mino"
            date={Date.now()}
            title="oui"
            img="https://media.istockphoto.com/id/1199486942/fr/photo/dr%C3%B4le-merci-carte-baiser-avec-des-animaux.jpg?s=1024x1024&w=is&k=20&c=ew-DCfMHG9cs9qppUkJfc80bRUZ1x278THFeCTNpml4="
          />
          <Card
            tags={[
              { label: "HTML", theme: "primary" },
              { label: "CSS", theme: "accent" }
            ]}
            price={{ value: "10", currency: "EUR" }}
            author="John Doe Mino"
            date={Date.now()}
            title="oui"
            img="https://media.istockphoto.com/id/1199486942/fr/photo/dr%C3%B4le-merci-carte-baiser-avec-des-animaux.jpg?s=1024x1024&w=is&k=20&c=ew-DCfMHG9cs9qppUkJfc80bRUZ1x278THFeCTNpml4="
          />
        </Grid>
      </Container>
    </div>
  );
}
