/**
 * Configuration parameters required to initialize the Fonepay client
 */
export type FonepayClientParams = {
  /** Merchant code provided by Fonepay */
  merchantCode: string;
  /** Secret key provided by Fonepay for request verification */
  secretKey: string;
  /** Base URL for the Fonepay API (production or test environment) */
  fonepayBaseUrl: string;
};

/**
 * Parameters required to initiate a payment through Fonepay
 */
export type InitiatePaymentParams = {
  /** Amount to be paid in the transaction */
  amount: number;
  /** Unique Product Reference Number for the transaction */
  prn: string;
  /** URL where Fonepay will redirect after payment completion.
   * This should be a backend route that will verify the payment */
  returnUrl: string;
  /** Optional custom remarks for the transaction */
  remarks1: string;
  /** Additional optional custom remarks for the transaction */
  remarks2?: string;
  /** Currency code for the transaction. Defaults to NPR (Nepalese Rupee) if not provided */
  currency?: string;
};

/**
 * Response object returned by Fonepay after payment processing
 */
export type FonepayResponse = {
  /** Product Reference Number - unique identifier for the transaction */
  PRN: string;
  /** Product ID */
  PID: string;
  /** Payment Status */
  PS: string;
  /** Response Code */
  RC: string;
  /** Unique ID */
  UID: string;
  /** Bank Code */
  BC: string;
  /** Transaction Initiated By */
  INI: string;
  /** Payment Amount */
  P_AMT: string;
  /** Remaining Amount */
  R_AMT: string;
  /** Data Verification value */
  DV: string;
};

/**
 * Represents the response received after initiating a payment.
 */
export type InitiatePaymentResponse = {
  url: string;
  success: boolean;
};

/**
 * Represents the Fonepay client interface, which provides methods
 * for initiating payments and verifying responses.
 */
export type FonepayClient = {
  /**
   * Initiates a payment process with the given parameters.
   *
   * @param params - The parameters required to initiate the payment.
   * @returns The response of the initiated payment.
   */
  initiatePayment: (params: InitiatePaymentParams) => InitiatePaymentResponse;

  /**
   * Verifies the validity of a Fonepay response.
   *
   * @param response - The response object to be verified.
   * @returns A boolean indicating whether the response is valid.
   */
  verifyResponse: (response: FonepayResponse) => boolean;
};

/**
 * Represents the fonepay request param keys.
 */
export type RequestParamKeys =
  | "PID"
  | "MD"
  | "PRN"
  | "AMT"
  | "CRN"
  | "DT"
  | "R1"
  | "R2"
  | "RU"
  | "DV";

/**
 * Represents the fonepay request param object with request param keys and value.
 */
export type RequestParams = Record<RequestParamKeys, string | number>;

/**
 * Constants used throughout the package
 */
export const PAYMENT_MODE = {
  PAYMENT: 'P'
} as const;

export const RESPONSE_CODE = {
  SUCCESSFUL: 'successful'
} as const;

export const DEFAULT_CURRENCY = 'NPR';
