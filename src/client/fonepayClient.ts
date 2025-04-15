import type { InitiatePaymentParams, FonepayClient, FonepayResponse } from "../types";
import { initiatePayment } from "../core/initiatePayment";
import { verifyResponse } from "../core/verifyResponse";

export function createClient(
  merchantCode: string,
  secretKey: string,
  baseUrl: string = "https://dev-client.fonepay.com/api"
): FonepayClient {
  if (!merchantCode) throw new Error("Fonepay merchantCode is required");
  if (!secretKey) throw new Error("Fonepay secretKey is required");

  return {
    initiatePayment: (params: InitiatePaymentParams) => {
      return initiatePayment(merchantCode, secretKey, baseUrl, params);
    },
    verifyResponse: (response: FonepayResponse) => {
      return verifyResponse(response, secretKey);
    },
  };
}
