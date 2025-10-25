"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/presentation/components/ui/field";
import { Input } from "@/presentation/components/ui/input";
import { Textarea } from "@/presentation/components/ui/textarea";
import { Button } from "@/presentation/components/ui/button";
import { Badge } from "@/presentation/components/ui/badge";
import { Spinner } from "@/presentation/components/ui/spinner";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/presentation/components/ui/radio-group";
import { Globe, Lock } from "lucide-react";
import {
  createLeagueSchema,
  type CreateLeagueFormData,
} from "@/presentation/schemas/league-schema";

interface CreateLeagueTabProps {
  isCreating: boolean;
  onSubmit: (data: CreateLeagueFormData) => void;
}

/**
 * Create League Tab Component
 * Form for creating a new league
 */
export function CreateLeagueTab({
  isCreating,
  onSubmit,
}: CreateLeagueTabProps) {
  const form = useForm<CreateLeagueFormData>({
    resolver: zodResolver(createLeagueSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "public",
    },
  });

  return (
    <Card className="pt-4 pb-4">
      <CardHeader>
        <CardTitle>Crear Nueva Liga</CardTitle>
        <CardDescription>
          Crea tu propia liga de predicciones y compite con tus amigos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Field data-invalid={!!form.formState.errors.name}>
            <FieldLabel htmlFor="name">Nombre de la Liga *</FieldLabel>
            <Input
              id="name"
              placeholder="Ej: Champions League 2025"
              aria-invalid={!!form.formState.errors.name}
              {...form.register("name")}
            />
            <FieldDescription>
              El nombre debe tener entre 3 y 100 caracteres.
            </FieldDescription>
            <FieldError errors={[form.formState.errors.name]} />
          </Field>

          <Field data-invalid={!!form.formState.errors.description}>
            <FieldLabel htmlFor="description">
              Descripción (opcional)
            </FieldLabel>
            <Textarea
              id="description"
              placeholder="Describe tu liga..."
              rows={3}
              aria-invalid={!!form.formState.errors.description}
              {...form.register("description")}
            />
            <FieldDescription>Máximo 500 caracteres.</FieldDescription>
            <FieldError errors={[form.formState.errors.description]} />
          </Field>

          <Field data-invalid={!!form.formState.errors.type}>
            <FieldLabel>Tipo de Liga *</FieldLabel>
            <RadioGroup
              defaultValue="public"
              onValueChange={(value) =>
                form.setValue("type", value as "public" | "private")
              }
            >
              <div className="flex items-center space-x-2 rounded-lg border border-primary/20 bg-primary/5 p-4 transition-colors hover:border-primary/40">
                <RadioGroupItem value="public" id="type-public" />
                <label htmlFor="type-public" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2 font-medium text-primary">
                    <Globe className="h-4 w-4" />
                    Pública
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Cualquiera puede unirse sin código de invitación
                  </p>
                </label>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border border-destructive/20 bg-destructive/5 p-4 transition-colors hover:border-destructive/40">
                <RadioGroupItem value="private" id="type-private" />
                <label htmlFor="type-private" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2 font-medium text-destructive">
                    <Lock className="h-4 w-4" />
                    Privada
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Solo con código de invitación
                  </p>
                </label>
              </div>
            </RadioGroup>
            <FieldError errors={[form.formState.errors.type]} />
          </Field>

          <Field>
            <FieldLabel>Avatar de la Liga</FieldLabel>
            <div className="rounded-lg border border-dashed p-4 text-center">
              <Badge variant="outline">Disponible próximamente</Badge>
              <p className="mt-2 text-sm text-muted-foreground">
                Pronto podrás personalizar el avatar de tu liga
              </p>
            </div>
          </Field>

          <div className="flex gap-2">
            <Button type="submit" disabled={isCreating} className="flex-1">
              {isCreating && <Spinner className="mr-2 h-4 w-4" />}
              Crear Liga
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Limpiar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
