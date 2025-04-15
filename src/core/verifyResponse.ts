import crypto from "crypto";
import type { FonepayResponse } from "../types/index";
import { generateHmacSha512 } from "../utils/index";

export function verifyResponse(
  response: FonepayResponse,
  secretKey: string
): boolean {
  try {
    if (response.RC !== "successful") {
      return false;
    }

    const order = [
      "PRN",
      "PID",
      "PS",
      "RC",
      "UID",
      "BC",
      "INI",
      "P_AMT",
      "R_AMT",
    ];

    const concatenatedValues = order
      .map((key) => response[key as keyof FonepayResponse])
      .join(",");

    const calculatedHash = generateHmacSha512(concatenatedValues, secretKey);
    if (!calculatedHash) {
      return false;
    }

    const calculatedDV = Buffer.from(calculatedHash, "hex");
    const fonepayDV = Buffer.from(response.DV, "hex");

    return crypto.timingSafeEqual(calculatedDV, fonepayDV);
  } catch (error) {
    console.error("Error verifying Fonepay response:", error);
    return false;
  }
}
