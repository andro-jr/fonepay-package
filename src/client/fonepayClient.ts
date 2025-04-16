import type {
  InitiatePaymentParams,
  FonepayClient,
  FonepayResponse,
  FonepayClientParams,
} from "../types/index";
import { initiatePayment } from "../core/initiatePayment";
import { verifyResponse } from "../core/verifyResponse";

/**
 * Creates a Fonepay client instance for handling payment operations
 * 
 * @param clientParams - Configuration parameters for the Fonepay client
 * @throws {Error} If any required parameters (merchantCode, secretKey, fonepayBaseUrl) are missing
 * @returns {FonepayClient} A client instance with methods to initiate and verify payments
 * 
 * @example
 * ```typescript
 * const client = createClient({
 *   merchantCode: "MERCHANT123",
 *   secretKey: "your-secret-key",
 *   fonepayBaseUrl: "https://dev-clientapi.fonepay.com" // or production URL
 * });
 * 
 * // Initiate a payment
 * const paymentUrl = client.initiatePayment({
 *   amount: 1000,
 *   prn: "PRN123",
 *   returnUrl: "https://your-site.com/verify",
 *   remarks1: "Payment for Order #123",
 * });
 * 
 * // Verify a payment response
 * const isValid = client.verifyResponse(fonepayResponse);
 * ```
 */
export function createClient(clientParams: FonepayClientParams): FonepayClient {
  if (!clientParams.merchantCode)
    throw new Error("Fonepay merchantCode is required");

  if (!clientParams.secretKey) 
    throw new Error("Fonepay secretKey is required");

  if (!clientParams.fonepayBaseUrl)
    throw new Error("Fonepay baseUrl is required");

  return {
    /**
     * Initiates a payment request to Fonepay
     * @param params - Payment parameters including amount, PRN, and return URL
     * @returns {InitiatePaymentResponse} Object containing the payment URL and success status
     */
    initiatePayment: (params: InitiatePaymentParams) => {
      return initiatePayment(
        clientParams.merchantCode,
        clientParams.secretKey,
        clientParams.fonepayBaseUrl,
        params
      );
    },

    /**
     * Verifies the response received from Fonepay after payment
     * @param response - The response object received from Fonepay's redirect
     * @returns {boolean} True if the response is valid and not tampered
     */
    verifyResponse: (response: FonepayResponse) => {
      return verifyResponse(response, clientParams.secretKey);
    },
  };
}
