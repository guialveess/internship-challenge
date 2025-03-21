"use client";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowUpRight } from "lucide-react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Input from "@/components/ui/input";
import {
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "../../lib/utils";
import { toast } from "sonner";

const schema = z.object({
  nome: z
    .string()
    .min(3, "Nome é obrigatório")
    .max(50, "Nome deve ter no máximo 50 caracteres"),
  email: z.string().email("Email inválido").min(5, "Email é obrigatório"),
});

type FormData = {
  nome: string;
  email: string;
};

type FormularioProps = {
  onSubmitSuccess: () => void;
};

const Formulario = ({ onSubmitSuccess }: FormularioProps) => {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      email: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await axios.post("/api/formulario", data);
      toast.success("Formulário enviado com sucesso!");
      onSubmitSuccess();
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      toast.error("Erro ao enviar formulário.");
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full sm:w-96">
          <CardHeader>
            <CardTitle>Formulário de Contato</CardTitle>
            <CardDescription>
              Preencha os campos abaixo para entrar em contato.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        label="Nome"
                        type="text"
                        placeholder="Digite seu Nome"
                        className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1">
                      {errors.nome?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        label="Email"
                        type="email"
                        placeholder="Digite seu Email"
                        className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-1">
                      {errors.email?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <button
                type="submit"
                className={cn(
                  "w-full px-4 py-3 rounded-xl text-sm font-medium",
                  "bg-indigo-600 text-white",
                  "hover:bg-indigo-700",
                  "transition-colors duration-300",
                  "flex items-center justify-center gap-2"
                )}
              >
                Enviar
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
        </Card>
      </div>
    </FormProvider>
  );
};

export default Formulario;
