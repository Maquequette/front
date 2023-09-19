import PageTransition from "@/components/04 - Templates/PageTransition/PageTransition";
import Heading from "@/components/01 - Atoms/Heading/Heading";
import Paragraph from "@/components/01 - Atoms/Paragraph/Paragraph";
import Container from "@/components/01 - Atoms/Container/Container";

export default function Cgu() {
  return (
    <PageTransition>
      <div className="cgu">
        <Container
          center={true}
          styles={{ display: "flex", flexDirection: "column", rowGap: "3rem" }}>
          <Heading level="primary" tag="h1">
            Conditions Générales d'Utilisation
          </Heading>
          <Heading level="secondary" tag="h2">
            Dernière mise à jour : Jeudi 14 Septembre 2023 à 00h00
          </Heading>
          <Paragraph>
            Les présentes Conditions Générales d'Utilisation ("CGU") régissent l'utilisation du site
            web Mac & Kate (ci-après dénommé le "Site") et des services associés proposés par
            Devlolopeur (ci-après dénommé "nous", "notre" ou "nos"). Veuillez lire attentivement ces
            CGU avant d'utiliser le Site. En utilisant le Site, vous acceptez d'être lié par ces
            CGU. Si vous n'acceptez pas ces CGU, veuillez ne pas utiliser le Site.
          </Paragraph>
          <Heading level="tertiary" tag="h3">
            1. Acceptation des CGU
          </Heading>
          <Paragraph>
            En utilisant le Site, vous déclarez être majeur dans votre juridiction de résidence et
            avoir la capacité légale de conclure un contrat. Si vous accédez au Site au nom d'une
            entreprise ou d'une entité, vous déclarez avoir l'autorité nécessaire pour lier cette
            entreprise ou entité aux présentes CGU.
          </Paragraph>
          <Heading level="tertiary" tag="h3">
            2. Utilisation du Site
          </Heading>
          <Paragraph>
            2.1. Contenu du Site : Le Site propose des cours et des ressources éducatives liées au
            développement front-end. Le contenu du Site est fourni à titre informatif et éducatif
            uniquement. Nous nous réservons le droit de modifier, suspendre ou interrompre tout ou
            partie du contenu du Site à notre seule discrétion.
          </Paragraph>
          <Paragraph>
            2.2. Compte Utilisateur : Pour accéder à certaines fonctionnalités du Site, vous pouvez
            être amené à créer un compte utilisateur. Vous êtes responsable de la confidentialité de
            vos informations d'identification et de toutes les activités qui se déroulent sous votre
            compte. Vous vous engagez à nous informer immédiatement de toute utilisation non
            autorisée de votre compte.
          </Paragraph>
          <Paragraph>
            2.3. Comportement de l'Utilisateur : Vous acceptez de n'utiliser le Site que
            conformément à la loi applicable et de ne pas utiliser le Site à des fins illégales ou
            interdites. Vous vous engagez à ne pas perturber, endommager ou compromettre l'intégrité
            du Site.
          </Paragraph>
          <Heading level="tertiary" tag="h3">
            3. Propriété Intellectuelle
          </Heading>
          <Paragraph>
            3.1. Droits d'Auteur : Tout le contenu du Site, y compris les textes, les images, les
            vidéos, les logiciels et autres éléments, est protégé par les lois sur le droit
            d'auteur. Vous vous engagez à respecter ces droits et à ne pas reproduire, distribuer,
            afficher publiquement ou créer des œuvres dérivées basées sur le contenu du Site sans
            notre autorisation écrite préalable.
          </Paragraph>
          <Paragraph>
            3.2. Marques de Commerce : Toutes les marques de commerce, logos et noms de produits ou
            de services affichés sur le Site sont la propriété de leurs propriétaires respectifs.
            Aucune utilisation de ces marques de commerce n'est autorisée sans le consentement écrit
            préalable du propriétaire.
          </Paragraph>
          <Heading level="tertiary" tag="h3">
            4. Limitation de Responsabilité
          </Heading>
          <Paragraph>
            4.1. Contenu : Nous ne garantissons pas l'exactitude, la pertinence ou l'exhaustivité du
            contenu du Site. Vous utilisez le contenu du Site à vos propres risques.
          </Paragraph>
          <Paragraph>
            4.2. Interruption du Service : Nous nous efforçons de maintenir le Site disponible en
            permanence, mais nous ne pouvons garantir son fonctionnement ininterrompu. Nous ne
            serons pas responsables des interruptions de service, des erreurs ou des perturbations
            du Site.
          </Paragraph>
          <Heading level="tertiary" tag="h3">
            5. Modification des CGU
          </Heading>
          <Paragraph>
            Nous nous réservons le droit de modifier ces CGU à tout moment. Les modifications seront
            effectives dès leur publication sur le Site. Il vous incombe de consulter régulièrement
            les CGU pour rester informé des mises à jour.
          </Paragraph>
          <Heading level="tertiary" tag="h3">
            6. Loi Applicable
          </Heading>
          <Paragraph>
            Les présentes CGU sont régies par et interprétées conformément aux lois de France. Tout
            litige découlant de ces CGU sera soumis à la juridiction exclusive des tribunaux de
            Lyon. Pour toute question ou préoccupation concernant ces CGU, veuillez nous contacter à
            l'adresse suivante : macandkate.sup@gmail.com.
          </Paragraph>
        </Container>
      </div>
    </PageTransition>
  );
}
