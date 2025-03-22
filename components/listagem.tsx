import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {Link} from "next-view-transitions";

type Item = {
  id: number;
  nome: string;
  email: string;
};

type ListagemProps = {
  posts: Item[];
};

export const revalidate = 20;

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
              <th className="py-2 px-4">Ação</th>
            </tr>
          </thead>

          <TableBody>
            {posts.map((post) => (
              <TableRow
                key={post.id}
                className="hover:bg-transparent [&>:not(:last-child)]:border-r"
              >
                <TableCell className="py-2 px-4">{post.id}</TableCell>
                <TableCell className="py-2 px-4">{post.nome}</TableCell>
                <TableCell className="py-2 px-4">{post.email}</TableCell>
                <TableCell className="py-2 px-4">
                  {" "}
                  <Link className="text-blue-900" href={`/listagem/${post.id}`}>Detalhes</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Listagem;
