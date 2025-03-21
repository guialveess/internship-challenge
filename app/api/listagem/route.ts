import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; 

export async function GET() {
  try {
    const formDataList = await prisma.formData.findMany(); 

    return NextResponse.json(formDataList);  // retornando dados json
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return NextResponse.json({ message: 'Erro ao buscar dados' }, { status: 500 });
  }
}
