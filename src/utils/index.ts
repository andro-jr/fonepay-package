import crypto from "crypto";
import type { InitiatePaymentParams, RequestParams } from "../types";

export const generateDate = (): string => {
  const date = new Date();
  return `${String(date.getMonth() + 1).padStart(2, "0")}/${String(
    date.getDate()
  ).padStart(2, "0")}/${date.getFullYear()}`;
};

export const generateHmacSha512 = (
  message: string,
  secretKey: string
): string | null => {
  try {
    const hmac = crypto.createHmac("sha512", Buffer.from(secretKey, "utf-8"));
    hmac.update(message, "utf-8");
    return hmac.digest("hex");
  } catch (error) {
    console.error("Exception while hashing using HMAC-SHA-512", error);
    return null;
  }
};

export const generateRequestParameter = (
  merchantCode: string,
  secretKey: string,
  paymentParams: InitiatePaymentParams
): RequestParams => {
  const dt = generateDate();
  const {
    prn,
    amount: amt,
    returnUrl,
    remarks1,
    remarks2,
    currency,
  } = paymentParams;

  const requestParams: RequestParams = {
    PID: merchantCode,
    PRN: prn,
    MD: merchantCode,
    AMT: amt,
    CRN: currency || "NPR",
    DT: dt,
    R1: remarks1 || "",
    R2: remarks2 || "",
    RU: returnUrl,
    DV: "",
  };

  // Order defined by the fonepay itself
  const orderedKeys = [
    "PID",
    "MD",
    "PRN",
    "AMT",
    "CRN",
    "DT",
    "R1",
    "R2",
    "RU",
  ];

  const concatenatedValues = orderedKeys
    .map((key) => requestParams[key as keyof RequestParams])
    .join(",");

  const hashedValue = generateHmacSha512(concatenatedValues, secretKey);
  if (!hashedValue) {
    throw new Error(
      "Failed to generate HMAC-SHA-512 hash for request parameters."
    );
  }
  requestParams.DV = hashedValue;

  return requestParams;
};
