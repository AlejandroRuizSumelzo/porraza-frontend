"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";
import { PasswordInput } from "@/presentation/components/ui/password-input";
import { Checkbox } from "@/presentation/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/presentation/components/ui/dialog";
import {
  Field,
  FieldLabel,
  FieldError,
} from "@/presentation/components/ui/field";
import {
  createDeleteAccountSchema,
  type DeleteAccountFormData,
  type DeleteAccountValidationMessages,
} from "@/presentation/schemas/delete-account-schema";

interface DeleteAccountSectionProps {
  userEmail: string;
  onDelete: (password: string) => Promise<void>;
  isLoading?: boolean;
  validationMessages: DeleteAccountValidationMessages;
}

export function DeleteAccountSection({
  userEmail,
  onDelete,
  isLoading = false,
  validationMessages,
}: DeleteAccountSectionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const schema = createDeleteAccountSchema(validationMessages);

  const form = useForm<DeleteAccountFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      confirmation: false,
    },
  });

  const handleSubmit = async (data: DeleteAccountFormData) => {
    await onDelete(data.password);
    setIsDialogOpen(false);
    form.reset();
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    form.reset();
  };

  return (
    <div className="rounded-lg border-2 border-destructive/50 bg-destructive/5 p-6">
      <div className="space-y-4">
        {/* Warning Header */}
        <div className="flex items-start gap-3">
          <AlertTriangle className="size-6 text-destructive shrink-0 mt-0.5" />
          <div className="flex-1 space-y-1">
            <h3 className="font-semibold text-lg">Zona de peligro</h3>
            <p className="text-sm text-muted-foreground">
              Las acciones en esta sección son permanentes e irreversibles.
            </p>
          </div>
        </div>

        {/* Delete Account Section */}
        <div className="rounded-md border bg-background p-4 space-y-3">
          <div>
            <h4 className="font-medium text-sm">Eliminar cuenta</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Una vez eliminada tu cuenta, toda tu información será borrada
              permanentemente. Esta acción no se puede deshacer.
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="mr-2 size-4" />
                Eliminar mi cuenta
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="size-5 text-destructive" />
                  ¿Estás absolutamente seguro?
                </DialogTitle>
                <DialogDescription className="space-y-2 pt-2">
                  <p>
                    Esta acción <strong>no se puede deshacer</strong>. Esto
                    eliminará permanentemente tu cuenta{" "}
                    <strong>{userEmail}</strong> y todos tus datos asociados:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm pl-2">
                    <li>Todas tus predicciones</li>
                    <li>Tu historial de ligas</li>
                    <li>Tu información de perfil</li>
                    <li>Tus estadísticas y puntos</li>
                  </ul>
                </DialogDescription>
              </DialogHeader>

              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4 pt-4"
              >
                {/* Password Confirmation */}
                <Field data-invalid={!!form.formState.errors.password}>
                  <FieldLabel htmlFor="delete-password">
                    Confirma tu contraseña
                  </FieldLabel>
                  <PasswordInput
                    id="delete-password"
                    placeholder="Ingresa tu contraseña"
                    disabled={isLoading}
                    {...form.register("password")}
                  />
                  <FieldError errors={[form.formState.errors.password]} />
                </Field>

                {/* Checkbox Confirmation */}
                <Field data-invalid={!!form.formState.errors.confirmation}>
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="delete-confirmation"
                      checked={form.watch("confirmation")}
                      onCheckedChange={(checked) =>
                        form.setValue("confirmation", checked === true)
                      }
                      disabled={isLoading}
                    />
                    <label
                      htmlFor="delete-confirmation"
                      className="text-sm leading-tight cursor-pointer"
                    >
                      Entiendo que esta acción es{" "}
                      <strong>permanente e irreversible</strong> y que perderé
                      todo mi progreso.
                    </label>
                  </div>
                  <FieldError errors={[form.formState.errors.confirmation]} />
                </Field>

                <DialogFooter className="gap-2 sm:gap-0">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isLoading}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="destructive"
                    disabled={isLoading || !form.formState.isValid}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        Eliminando...
                      </>
                    ) : (
                      <>
                        <Trash2 className="mr-2 size-4" />
                        Sí, eliminar mi cuenta
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
