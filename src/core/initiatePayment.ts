import { generateRequestParameter } from "../utils/index";
import type {
  InitiatePaymentParams,
  PaymentResponse,
  RequestParams,
} from "../types";

export function initiatePayment(
  merchantCode: string,
  secretKey: string,
  baseUrl: string,
  paymentParams: InitiatePaymentParams
): PaymentResponse {
  const requestQueryParams = generateRequestParameter(
    merchantCode,
    secretKey,
    paymentParams
  );

  const url = new URL(baseUrl);
  Object.entries(requestQueryParams).forEach(([key, value]) => {
    if (value) {
      url.searchParams.append(key, value as keyof RequestParams);
    }
  });

  return { url: url.toString() };
}
