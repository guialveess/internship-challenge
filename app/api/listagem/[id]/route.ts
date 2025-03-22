import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; 

export const revalidate = 40;

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json({ message: 'ID não fornecido' }, { status: 400 });
    }

    const formData = await prisma.formData.findUnique({
      where: {
        id: Number(id), 
      },
    });

    if (!formData) {
      return NextResponse.json({ message: 'Item não encontrado' }, { status: 404 });
    }

    return NextResponse.json(formData); 
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return NextResponse.json({ message: 'Erro ao buscar dados' }, { status: 500 });
  }
}
