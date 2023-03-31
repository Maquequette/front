import { MouseEvent, useState } from "react";
import Container from "@/components/01 - Atoms/Container/Container";
import Search from "@/components/01 - Atoms/Search/Search";
import Multiselect from "@/components/02 - Molecules/Multiselect/Multiselect";

export default function DesignSystem() {
  return (
    <Container center={true}>
      <Search placeholder="search..." />

      <Multiselect options={[
        {
          value: 'caca',
          label: 'caca'
        },
        {
          value: 'pipi',
          label: 'pipi'
        },
        {
          value: 'prout',
          label: 'prout'
        },
        {
          value: 'vomi',
          label: 'vomi'
        }
      ]}
        theme={"primary"}
        multiple={true}
      />
    </Container>
  );
}
