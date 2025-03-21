'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

type Post = {
  id: number;
  title: string;
  body: string;
};

const Listagem = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagina, setPagina] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${pagina}&_limit=5`);
        setPosts(res.data);
      } catch (error) {
        console.error('Erro ao carregar os dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [pagina]);

  return (
    <div>
      <h1>Lista de Posts</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
          <button onClick={() => setPagina(pagina - 1)} disabled={pagina <= 1}>
            Anterior
          </button>
          <button onClick={() => setPagina(pagina + 1)}>Próximo</button>
        </>
      )}
    </div>
  );
};

export default Listagem;
