import { Link } from "next-view-transitions";
import Container from "../components/container";
import { BlurFade } from "@/components/ui/blur-fade";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <main className="flex flex-col gap-[32px] items-center">
        <Container>
          <section id="header">
            <BlurFade delay={0.25} inView>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Bem-vindo a página de inscrições 👋
              </h2>
            </BlurFade>
            <BlurFade className="mt-6" delay={0.25 * 2} inView>
              <span className="text-xl text-pretty tracking-tighter sm:text-3xl xl:text-4xl/none mt-8">
                Você pode acessar o formulário clicando no link abaixo:
              </span>
            </BlurFade>
          </section>

          <BlurFade delay={0.25 * 3} inView>
            <Link
              href="/formulario"
              className="w-full px-4 py-3 rounded-xl text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center gap-2 mt-6"
            >
              Acessar Formulário
            </Link>
          </BlurFade>
        </Container>
      </main>
    </div>
  );
}
