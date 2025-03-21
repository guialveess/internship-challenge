import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

type Item = {
  id: number;
  nome: string;
  email: string;
};

type ListagemProps = {
  posts: Item[];
};

const Listagem: React.FC<ListagemProps> = ({ posts }) => {
  return (
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
            {posts.map((post) => (
              <TableRow key={post.id} className="hover:bg-transparent [&>:not(:last-child)]:border-r">
                <TableCell className="py-2 px-4">{post.id}</TableCell>
                <TableCell className="py-2 px-4">{post.nome}</TableCell>
                <TableCell className="py-2 px-4">{post.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Listagem;
