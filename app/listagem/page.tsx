'use client';  

import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";  
import { Checkbox } from "@/components/ui/checkbox";
import Container from "@/components/container";

interface Item {
  id: number;
  nome: string;
  email: string;
}

export default function ListagemPage() {
  const [itens, setItens] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<number[]>([]); // state para gerenciar os itens selecionados

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/listagem');  
      setItens(response.data);
    } catch (error) {
      console.error('Erro ao carregar os dados', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(id)) {
        return prevSelectedItems.filter(itemId => itemId !== id);
      } else {
        return [...prevSelectedItems, id];
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Carregando Inscrições...</div>;
  }

  return (
    <Container>
      <div className="flex justify-center items-center min-h-screen">
        <div className="relative max-w-full overflow-auto rounded-md border bg-background">
          <Table aria-label="Listagem de Itens">
            <thead>
              <tr>
                <th className="py-2 px-4">Selecionar</th>
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Nome</th>
                <th className="py-2 px-4">Email</th>
              </tr>
            </thead>
            <TableBody>
              {itens.map((item) => (
                <TableRow key={item.id} className="hover:bg-transparent [&>:not(:last-child)]:border-r">
                  <TableCell className="py-2 px-4">
                    <Checkbox 
                    
                      onChange={() => handleCheckboxChange(item.id)} 
                    />
                  </TableCell>
                  <TableCell className="py-2 px-4">{item.id}</TableCell>
                  <TableCell className="py-2 px-4">{item.nome}</TableCell>
                  <TableCell className="py-2 px-4">{item.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Container>
  );
}
