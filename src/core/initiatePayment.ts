import { generateRequestParameter } from "../utils/index";
import type {
  InitiatePaymentParams,
  InitiatePaymentResponse,
  RequestParams,
} from "../types/index";

/**
 * Core function to initiate a payment request with Fonepay
 * 
 * This function takes the merchant credentials and payment parameters,
 * generates the required request parameters including security verification,
 * and returns a URL that can be used to redirect users to the Fonepay payment page.
 * 
 * @param merchantCode - The merchant code provided by Fonepay
 * @param secretKey - The secret key for request verification
 * @param baseUrl - The Fonepay API base URL
 * @param paymentParams - Object containing payment details like amount, PRN, etc.
 * @returns {InitiatePaymentResponse} Object containing success status and payment URL
 * @throws {Error} If parameter generation fails or any required parameter is missing
 */
export const initiatePayment = (
  merchantCode: string,
  secretKey: string,
  baseUrl: string,
  paymentParams: InitiatePaymentParams
): InitiatePaymentResponse => {
  try {
    const requestQueryParams = generateRequestParameter(
      merchantCode,
      secretKey,
      paymentParams
    );

    if (!requestQueryParams || typeof requestQueryParams !== "object") {
      throw new Error("Failed to generate request parameters.");
    }

    const url = new URL(baseUrl);
    Object.entries(requestQueryParams).forEach(([key, value]) => {
      if (value) {
        url.searchParams.append(key, value as keyof RequestParams);
      }
    });

    return { success: true, url: url.toString() };
  } catch (error) {
    console.error("Error initiating payment:", error);
    throw new Error("Payment initiation failed.");
  }
};
