import { useState } from "react";
import Container from "@/components/01 - Atoms/Container/Container";
import Search from "@/components/01 - Atoms/Search/Search";

export default function DesignSystem() {
  return (
    <Container center={true}>
      <Search placeholder="search..." />
    </Container>
  );
}
