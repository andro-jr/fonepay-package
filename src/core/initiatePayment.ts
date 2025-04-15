import { generateRequestParameter } from "../utils/index";
import type {
  InitiatePaymentParams,
  InitiatePaymentResponse,
  RequestParams,
} from "../types";

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

    return { url: url.toString() };
  } catch (error) {
    console.error("Error initiating payment:", error);
    throw new Error("Payment initiation failed.");
  }
};
