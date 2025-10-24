import type {
  CheckoutSession,
  PaymentStatus,
} from "@/domain/entities/checkout-session";
import type { PaymentRepository } from "@/domain/repositories/payment-repository";
import type { HttpClient } from "@/infrastructure/http/client";
import type {
  CheckoutSessionDTO,
  PaymentStatusDTO,
} from "@/infrastructure/http/dtos/payment-dto";
import { PaymentMapper } from "@/infrastructure/mappers/payment-mapper";
import { HttpError } from "@/infrastructure/http/client";

/**
 * Payment Repository Implementation
 * Implements the PaymentRepository interface from domain layer
 * Handles all HTTP communication with the payment API (Stripe)
 */
export class PaymentRepositoryImpl implements PaymentRepository {
  private readonly baseUrl = "/payments";

  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Creates a Stripe Checkout Session and returns the client secret
   * Used by EmbeddedCheckoutProvider to initialize the checkout form
   * @returns Promise with CheckoutSession (clientSecret + sessionId)
   * @throws Error if user already paid, not authenticated, or user not found
   */
  async createCheckoutSession(): Promise<CheckoutSession> {
    try {
      const response = await this.httpClient.post<CheckoutSessionDTO>(
        `${this.baseUrl}/create-checkout-session`
      );
      console.log(
        "[PaymentRepositoryImpl] Create checkout session response:",
        response.data
      );

      return PaymentMapper.toCheckoutSessionDomain(response.data);
    } catch (error) {
      if (error instanceof HttpError) {
        // Handle specific error codes from backend
        switch (error.status) {
          case 400:
            // User already paid
            throw new Error("Ya has completado el pago anteriormente");

          case 401:
            // Not authenticated
            throw new Error(
              "Debes iniciar sesión para realizar el pago"
            );

          case 404:
            // User not found
            throw new Error("Usuario no encontrado");

          case 500:
            // Server error
            throw new Error(
              "Error en el servidor. Por favor, inténtalo de nuevo más tarde."
            );

          default:
            throw new Error(`Error al crear sesión de pago: ${error.message}`);
        }
      }

      // Network or unknown error
      if (error instanceof Error) {
        throw new Error(`Error de conexión: ${error.message}`);
      }

      throw new Error("Error desconocido al crear sesión de pago");
    }
  }

  /**
   * Verifies if the current user has completed payment
   * Used in middleware and components to check payment status
   * @returns Promise with PaymentStatus (hasPaid + optional paymentDate)
   * @throws Error if not authenticated or user not found
   */
  async verifyPaymentStatus(): Promise<PaymentStatus> {
    try {
      const response = await this.httpClient.get<PaymentStatusDTO>(
        `${this.baseUrl}/verify-status`
      );
      console.log(
        "[PaymentRepositoryImpl] Verify payment status response:",
        response.data
      );

      return PaymentMapper.toPaymentStatusDomain(response.data);
    } catch (error) {
      if (error instanceof HttpError) {
        // Handle specific error codes from backend
        switch (error.status) {
          case 401:
            // Not authenticated
            throw new Error(
              "Debes iniciar sesión para verificar el estado del pago"
            );

          case 404:
            // User not found
            throw new Error("Usuario no encontrado");

          case 500:
            // Server error
            throw new Error(
              "Error en el servidor. Por favor, inténtalo de nuevo más tarde."
            );

          default:
            throw new Error(
              `Error al verificar estado del pago: ${error.message}`
            );
        }
      }

      // Network or unknown error
      if (error instanceof Error) {
        throw new Error(`Error de conexión: ${error.message}`);
      }

      throw new Error("Error desconocido al verificar estado del pago");
    }
  }

  /**
   * Retrieves session status by session_id
   * Used in return/success page to verify payment completion
   * @param sessionId - Stripe checkout session ID
   * @returns Promise with PaymentStatus (hasPaid, paymentDate, email)
   * @throws Error if not authenticated or session not found
   */
  async getSessionStatus(sessionId: string): Promise<PaymentStatus> {
    try {
      const response = await this.httpClient.get<PaymentStatusDTO>(
        `${this.baseUrl}/session-status/${sessionId}`
      );
      console.log(
        "[PaymentRepositoryImpl] Get session status response:",
        response.data
      );

      return PaymentMapper.toPaymentStatusDomain(response.data);
    } catch (error) {
      if (error instanceof HttpError) {
        // Handle specific error codes from backend
        switch (error.status) {
          case 401:
            // Not authenticated
            throw new Error(
              "Debes iniciar sesión para verificar el estado de la sesión"
            );

          case 404:
            // Session not found
            throw new Error("Sesión de pago no encontrada");

          case 500:
            // Server error
            throw new Error(
              "Error en el servidor. Por favor, inténtalo de nuevo más tarde."
            );

          default:
            throw new Error(
              `Error al obtener estado de sesión: ${error.message}`
            );
        }
      }

      // Network or unknown error
      if (error instanceof Error) {
        throw new Error(`Error de conexión: ${error.message}`);
      }

      throw new Error("Error desconocido al obtener estado de sesión");
    }
  }
}
