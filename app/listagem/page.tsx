"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Container from "@/components/container";
import { motion } from "framer-motion";
import Button from "@/components/button";

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
        <div className="relative max-w-full overflow-auto rounded-md border bg-background">
          <div className="overflow-x-auto">
            <Table aria-label="Listagem de Itens">
              <thead>
                <tr>
                  <th className="py-2 px-4">ID</th>
                  <th className="py-2 px-4">Nome</th>
                  <th className="py-2 px-4">Email</th>
                </tr>
              </thead>
              <TableBody>
                {itens.map((item) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-transparent [&>:not(:last-child)]:border-r"
                  >
                    <TableCell className="py-2 px-4">{item.id}</TableCell>
                    <TableCell className="py-2 px-4">{item.nome}</TableCell>
                    <TableCell className="py-2 px-4">{item.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="w-full max-w-sm mt-6">
          <Button href="/" className="w-full">
            Voltar para página inicial
          </Button>
        </div>
      </div>
    </Container>
  );
}
