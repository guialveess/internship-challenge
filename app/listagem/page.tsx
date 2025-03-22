"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Listagem from "@/components/listagem";
import { motion } from "framer-motion";
import Button from "@/components/button";
import Container from "@/components/container";

interface Item {
  id: number;
  nome: string;
  email: string;
}

export default function ListagemPage() {
  const [itens, setItens] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/listagem");
      setItens(response.data);
    } catch (error) {
      console.error("Erro ao carregar os dados", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen mx-auto max-w-lg">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          Carregando Inscrições...
        </motion.div>
      </div>
    );
  }

  return (
    <Container>
      <div className="flex flex-col justify-center items-center min-h-screen mx-auto max-w-lg">
        <Listagem posts={itens} />
        
        <div className="w-full max-w-sm mt-6">
          <Button href="/" className="w-full">
            Voltar para página inicial
          </Button>
        </div>
      </div>
    </Container>
  );
}
