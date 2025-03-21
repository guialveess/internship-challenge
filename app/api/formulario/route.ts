import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 
import { z } from "zod";

const formSchema = z.object({
  nome: z.string().min(3, "Nome é obrigatório").max(50, "Nome deve ter no máximo 50 caracteres"),
  email: z.string().email("Email inválido").min(5, "Email é obrigatório"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = formSchema.parse(body);

    const existingEmail = await prisma.formData.findUnique({
      where: { email: parsedData.email },
    });

    if (existingEmail) {
      return NextResponse.json(
        { error: "O email já está registrado. Por favor, use outro email." },
        { status: 400 }
      );
    }

    const newFormData = await prisma.formData.create({
      data: {
        nome: parsedData.nome,
        email: parsedData.email,
      },
    });

    return NextResponse.json(newFormData, { status: 201 });
  } catch (error) {
    if ((error as any).code === "P2002") {
      return NextResponse.json(
        { error: "Erro de banco de dados. O email já existe." },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Erro inesperado ao processar a solicitação." }, { status: 500 });
  }
}
