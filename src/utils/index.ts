import crypto from "crypto";
import type { InitiatePaymentParams, RequestParams } from "../types/index";

/**
 * Generates a date string in the format required by Fonepay (MM/DD/YYYY)
 * @returns {string} Formatted date string
 */
export const generateDate = (): string => {
  const date = new Date();
  return `${String(date.getMonth() + 1).padStart(2, "0")}/${String(
    date.getDate()
  ).padStart(2, "0")}/${date.getFullYear()}`;
};

/**
 * Generates an HMAC-SHA-512 hash of the provided message using the secret key
 * Used for creating and verifying digital signatures in Fonepay requests/responses
 * 
 * @param message - The string to be hashed
 * @param secretKey - The secret key used for HMAC generation
 * @returns {string | null} Hexadecimal string of the hash, or null if generation fails
 */
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

/**
 * Generates the required request parameters for initiating a Fonepay payment
 * 
 * This function:
 * 1. Validates required parameters
 * 2. Formats the parameters according to Fonepay's specifications
 * 3. Generates a digital signature (DV) using HMAC-SHA-512
 * 
 * @param merchantCode - The merchant code provided by Fonepay
 * @param secretKey - The secret key for generating the digital signature
 * @param paymentParams - Object containing payment details
 * @returns {RequestParams} Object containing all required Fonepay request parameters
 * @throws {Error} If required parameters are missing or hash generation fails
 */
export const generateRequestParameter = (
  merchantCode: string,
  secretKey: string,
  paymentParams: InitiatePaymentParams
): RequestParams => {
  const dt = generateDate();
  const { prn, amount, returnUrl, remarks1, remarks2, currency } =
    paymentParams;

  if (!remarks1) throw new Error("remarks1 is required");
  if (!prn) throw new Error("prn is required");
  if (!returnUrl) throw new Error("returnUrl is required");

  const requestParams: RequestParams = {
    PID: merchantCode,
    PRN: prn,
    MD: "P", // P - Payment
    AMT: amount,
    CRN: currency || "NPR",
    DT: dt,
    R1: remarks1,
    R2: remarks2 || "N/A",
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
