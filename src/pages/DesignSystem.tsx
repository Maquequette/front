<<<<<<< Updated upstream
import Button from "@/components/01 - Atoms/Button/Button";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import Select from "@/components/01 - Atoms/Select/Select";
import Multiselect from "@/components/03 - Organisms/Multiselect/Multiselect";
import useToasts from "@/hooks/useToasts";
import Dialog from "@/components/04 - Templates/Dialog/Dialog";
import Tabs from "@/components/03 - Organisms/Tabs/Tabs";
import Input from "@/components/01 - Atoms/Input/Input";
import Label from "@/components/01 - Atoms/Label/Label";
import { useState } from "react";
import Login from "@/components/03 - Organisms/Auth/Login";
import Register from "@/components/03 - Organisms/Auth/Register";
import { TabsProvider } from "@/contexts/TabsContext";

export default function DesignSystem() {
  const { pushToast } = useToasts();
  const [dialog, setDialog] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInput(value);
  };

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
        styles={{ margin: '3rem' }}
        handleClick={() => {
          //pushToast({ title: "oui", desc: "PIOUI", theme: "primary", duration: 10 })
          setDialog(!dialog)
        }}>
        <Svg id="arrow"></Svg>
        DesignSystem
      </Button>

      <Label
        name="test"
        required={true}
      >
        EMAIL
      </Label>

      <Input
        type="password"
        name="test"
        styles={{ margin: '3rem', maxWidth: '20rem' }}
        placeholder="password"
        value={input}
        handleOnChange={inputHandler}
      />


      <Dialog
        id="Auth"
        visible={dialog}
        Dismiss={() => setDialog(!dialog)}
      >

        <TabsProvider>
          <Tabs tabs={[
            {
              tabTitle: 'Login',
              tabContent: <Login />
            },
            {
              tabTitle: 'Register',
              tabContent: <Register />
            }
          ]} />
        </TabsProvider>

      </Dialog>

      {/* <div style={{ marginTop: "3rem" }}>
        <Multiselect
          theme="primary"
          options={[
            { label: "Test", value: "value" },
            { label: "Test2", value: "value2" },
            { label: "Test3", value: "value3" },
            { label: "Test3", value: "value4" }
          ]}
        />
      </div> */}

=======
import Grid from "@/components/02 -  Molecules/Grid/Grid";
import Card from "@/components/03 - Organisms/Card/Card";
import Container from "@/components/01 - Atoms/Container/Container";
export default function DesignSystem() {
  return (
    <div style={{ marginTop: "3rem", marginLeft: "3rem" }}>
      <Container center={true}>
        <Grid>
          <Card
            title="oui"
            img="https://media.istockphoto.com/id/1199486942/fr/photo/dr%C3%B4le-merci-carte-baiser-avec-des-animaux.jpg?s=1024x1024&w=is&k=20&c=ew-DCfMHG9cs9qppUkJfc80bRUZ1x278THFeCTNpml4="
          />
          <Card
            title="oui"
            img="https://media.istockphoto.com/id/1199486942/fr/photo/dr%C3%B4le-merci-carte-baiser-avec-des-animaux.jpg?s=1024x1024&w=is&k=20&c=ew-DCfMHG9cs9qppUkJfc80bRUZ1x278THFeCTNpml4="
          />
          <Card
            title="oui"
            img="https://media.istockphoto.com/id/1199486942/fr/photo/dr%C3%B4le-merci-carte-baiser-avec-des-animaux.jpg?s=1024x1024&w=is&k=20&c=ew-DCfMHG9cs9qppUkJfc80bRUZ1x278THFeCTNpml4="
          />
          <Card
            title="oui"
            img="https://media.istockphoto.com/id/1199486942/fr/photo/dr%C3%B4le-merci-carte-baiser-avec-des-animaux.jpg?s=1024x1024&w=is&k=20&c=ew-DCfMHG9cs9qppUkJfc80bRUZ1x278THFeCTNpml4="
          />
          <Card
            title="oui"
            img="https://media.istockphoto.com/id/1199486942/fr/photo/dr%C3%B4le-merci-carte-baiser-avec-des-animaux.jpg?s=1024x1024&w=is&k=20&c=ew-DCfMHG9cs9qppUkJfc80bRUZ1x278THFeCTNpml4="
          />
        </Grid>
      </Container>
>>>>>>> Stashed changes
    </div>
  );
}
