export type InitiatePaymentParams = {
  amount: number; // Amount to be paid
  prn: string; // Product Reference Number
  returnUrl: string; // URL to redirect after payment completion: usually a backend route which will verify the payment
  remarks1?: string; // R1 parameter
  remarks2?: string; // R2 parameter
  currency?: string; // CRN parameter, defaults to NPR if not provided
};

export type VerifyPaymentParams = {
  [key: string]: string; // or a more structured type
  hash: string;
};

export type PaymentResponse = {
  url: string;
};

export type FonepayClient = {
  initiatePayment: (params: InitiatePaymentParams) => PaymentResponse;
  //   verifyResponse: (response: VerifyPaymentParams) => boolean;
};

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

export type RequestParams = Record<RequestParamKeys, string | number>;
