"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Button from "@/components/button";

export default function InscricaoDetalhe() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await axios.get(`/api/listagem/${id}`);
          setItem(response.data);
        } catch (error) {
          console.error("Erro ao carregar os dados", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Carregando...
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Inscrição não encontrada
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative max-w-4xl w-full p-4 bg-background border rounded-md">
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
              <TableRow
                key={item.id}
                className="hover:bg-transparent [&>:not(:last-child)]:border-r"
              >
                <TableCell className="py-2 px-4">{item.id}</TableCell>
                <TableCell className="py-2 px-4">{item.nome}</TableCell>
                <TableCell className="py-2 px-4">{item.email}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="w-full max-w-sm mt-6">
            <Button href="/listagem" className="w-full">
              Voltar para página de listagem
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
