"use client";

import {
  SidebarTrigger,
  useSidebar,
} from "@/presentation/components/ui/sidebar";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/presentation/components/ui/tabs";
import { GroupStagePredictions } from "@/presentation/components/predictions/group-stage-predictions";
import { Trophy, Target, Award } from "lucide-react";

export default function PredictionsPage() {
  const { open } = useSidebar();

  return (
    <div className="flex h-full flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        {!open && <SidebarTrigger />}
        <h1 className="text-xl font-semibold">Predicciones</h1>
      </header>
      <main className="flex-1 overflow-auto p-4">
        <div className="mx-auto max-w-5xl">
          <Tabs defaultValue="groups" className="w-full">
            <TabsList className="mb-6 w-full justify-start">
              <TabsTrigger value="groups" className="gap-2">
                <Target className="size-4" />
                Fase de grupos
              </TabsTrigger>
              <TabsTrigger value="knockout" className="gap-2">
                <Trophy className="size-4" />
                Eliminatorias
              </TabsTrigger>
              <TabsTrigger value="awards" className="gap-2">
                <Award className="size-4" />
                Premios
              </TabsTrigger>
            </TabsList>

            <TabsContent value="groups">
              <GroupStagePredictions />
            </TabsContent>

            <TabsContent value="knockout">
              <div className="rounded-xl border bg-card p-12 text-center">
                <Trophy className="mx-auto mb-4 size-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold">Eliminatorias</h3>
                <p className="text-sm text-muted-foreground">
                  Las predicciones para la fase eliminatoria estarán disponibles
                  una vez completes la fase de grupos.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="awards">
              <div className="rounded-xl border bg-card p-12 text-center">
                <Trophy className="mx-auto mb-4 size-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold">
                  Premios individuales
                </h3>
                <p className="text-sm text-muted-foreground">
                  Podrás predecir el ganador de premios individuales (Bota de
                  Oro, Mejor jugador, etc.).
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
