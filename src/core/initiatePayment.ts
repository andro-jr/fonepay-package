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
    // Validate baseUrl
    let url: URL;
    try {
      url = new URL(baseUrl);
    } catch (error) {
      throw new Error(`Invalid base URL provided: ${baseUrl}`);
    }

    // Generate and validate request parameters
    const requestQueryParams = generateRequestParameter(
      merchantCode,
      secretKey,
      paymentParams
    );

    if (!requestQueryParams || typeof requestQueryParams !== "object") {
      throw new Error(
        "Failed to generate request parameters: Invalid response from parameter generator"
      );
    }

    // Append parameters to URL with validation
    Object.entries(requestQueryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      } else {
        throw new Error(`Required parameter ${key} is missing or invalid`);
      }
    });

    return { success: true, url: url.toString() };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error initiating payment:", errorMessage);
    throw new Error(`Payment initiation failed: ${errorMessage}`);
  }
};
