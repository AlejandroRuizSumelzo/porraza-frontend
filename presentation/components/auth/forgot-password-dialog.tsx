"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Mail, CheckCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  createForgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/presentation/schemas/forgot-password-schema";
import { useForgotPasswordForm } from "@/presentation/hooks/auth/use-forgot-password";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/presentation/components/ui/dialog";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/presentation/components/ui/field";

/**
 * Forgot Password Dialog Component
 *
 * Dialog that allows users to request a password reset email.
 * Can be controlled externally or used as standalone component.
 *
 * Clean Architecture:
 * - Located in presentation layer
 * - Uses custom hooks for business logic
 * - Handles form validation with Zod
 * - Provides user feedback with toasts
 *
 * Features:
 * - Email validation
 * - Loading states
 * - Success/error feedback
 * - Auto-closes on success
 * - Controlled or uncontrolled mode
 */
interface ForgotPasswordDialogProps {
  /** Controlled open state (optional) */
  open?: boolean;
  /** Controlled open state handler (optional) */
  onOpenChange?: (open: boolean) => void;
}

export function ForgotPasswordDialog({
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: ForgotPasswordDialogProps = {}) {
  const t = useTranslations("auth.forgot");
  const validationT = useTranslations("forms.validation");
  const placeholders = useTranslations("forms.placeholders");

  const [internalOpen, setInternalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { forgotPassword, isLoading, error, clearError } =
    useForgotPasswordForm();

  // Use controlled state if provided, otherwise use internal state
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen =
    controlledOnOpenChange !== undefined
      ? controlledOnOpenChange
      : setInternalOpen;

  const forgotPasswordSchema = useMemo(
    () =>
      createForgotPasswordSchema({
        emailRequired: validationT("forgot_email_required"),
        emailInvalid: validationT("email_invalid"),
      }),
    [validationT]
  );

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onResetPassword = async (data: ForgotPasswordFormData) => {
    clearError();
    setSuccessMessage(null);

    const response = await forgotPassword(data.email);

    if (response) {
      // Success: Show message and schedule auto-close
      const successText = response.message ?? t("success_state.message");
      setSuccessMessage(successText);
      toast.success(t("toasts.success.title"), {
        description: successText,
      });

      // Reset form and close dialog after 2.5 seconds
      form.reset();
      setTimeout(() => {
        setOpen(false);
        setSuccessMessage(null);
      }, 2500);
    } else {
      // Error: Toast already shows the error, FieldError will display it inline
      toast.error(t("auth.toasts.error.title"), {
        description: error ?? t("auth.toasts.error.description"),
      });
    }
  };

  // Reset form when dialog closes
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      form.reset();
      clearError();
      setSuccessMessage(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            {t("title")}
          </DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {successMessage ? (
            // Success State - Animated
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center justify-center py-8 gap-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center"
              >
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </motion.div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {successMessage}
                </p>
              </div>
            </motion.div>
          ) : (
            // Form State - Animated
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onSubmit={form.handleSubmit(onResetPassword)}
              className="space-y-5"
            >
              <Field data-invalid={!!form.formState.errors.email}>
                <FieldLabel htmlFor="forgot-email">
                  {t("field_label")}
                </FieldLabel>
                <Input
                  id="forgot-email"
                  type="email"
                  placeholder={placeholders("email")}
                  autoComplete="email"
                  aria-invalid={!!form.formState.errors.email}
                  disabled={isLoading}
                  {...form.register("email")}
                />
                <FieldDescription>{t("field_description")}</FieldDescription>
                <FieldError errors={[form.formState.errors.email]} />
              </Field>

              {/* Backend error display using FieldError pattern */}
              {error && (
                <div
                  role="alert"
                  className="text-destructive text-sm font-normal"
                >
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={isLoading}
                >
                  {t("cancel")}
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("submit_loading")}
                    </>
                  ) : (
                    t("submit")
                  )}
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
