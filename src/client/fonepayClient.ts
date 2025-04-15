import type { InitiatePaymentParams, FonepayClient } from "../types";
import { initiatePayment } from "../core/initiatePayment";

export function createClient(config: {
  merchantCode: string;
  secretKey: string;
  baseUrl?: string;
}): FonepayClient {
  const {
    merchantCode,
    secretKey,
    baseUrl = "https://dev-client.fonepay.com/api",
  } = config;

  if (!merchantCode) throw new Error("Fonepay merchantCode is required");
  if (!secretKey) throw new Error("Fonepay secretKey is required");

  return {
    initiatePayment: (params: InitiatePaymentParams) => {
      return initiatePayment(merchantCode, secretKey, baseUrl, params);
    },
  };
}
