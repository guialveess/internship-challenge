"use client";
import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; 
import Formulario from "@/app/formulario/components/form"; 
import Container from "@/components/container";

export default function FormularioPage() {
  const router = useRouter(); 

  const handleFormSubmit = () => {
    toast.success("Formulário enviado com sucesso! Redirecionando para a página de listagem...");

    setTimeout(() => {
      router.push("/listagem");
    }, 2000); 
  };

  return (
    <Container>
      <Formulario onSubmitSuccess={handleFormSubmit} />
    </Container>
  );
}
