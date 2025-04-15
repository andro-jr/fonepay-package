export type InitiatePaymentParams = {
  amount: number; // Amount to be paid
  prn: string; // Product Reference Number
  returnUrl: string; // URL to redirect after payment completion: usually a backend route which will verify the payment
  remarks1?: string; // R1 parameter
  remarks2?: string; // R2 parameter
  currency?: string; // CRN parameter, defaults to NPR if not provided
};

export type FonepayResponse = {
  PRN: string;
  PID: string;
  PS: string;
  RC: string;
  UID: string;
  BC: string;
  INI: string;
  P_AMT: string;
  R_AMT: string;
  DV: string;
};

export type InitiatePaymentResponse = {
  url: string;
};

export type FonepayClient = {
  initiatePayment: (params: InitiatePaymentParams) => InitiatePaymentResponse;
  verifyResponse: (response: FonepayResponse) => boolean;
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
