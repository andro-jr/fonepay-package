# Fonepay Integration Package

A TypeScript/JavaScript package for integrating Fonepay payment gateway into your Node.js applications.

## Installation

```bash
npm install fonepay-package
# or
yarn add fonepay-package
```

## Usage

```typescript
import { createClient } from "fonepay-package";

// Initialize the client
const fonepay = createClient(
  "YOUR_MERCHANT_CODE",
  "YOUR_SECRET_KEY",
  "https://dev-client.fonepay.com/api" // optional, defaults to dev URL
);

// Initiate a payment
const paymentResponse = fonepay.initiatePayment({
  amount: 1000,
  prn: "UNIQUE_REFERENCE",
  returnUrl: "https://your-site.com/payment/verify",
  remarks1: "Optional remark 1",
  remarks2: "Optional remark 2",
  currency: "NPR", // optional, defaults to NPR
});

// The payment URL to redirect the user to
console.log(paymentResponse.url);

// Verify payment response
const isValid = fonepay.verifyResponse({
  PRN: "REFERENCE",
  PID: "MERCHANT_ID",
  PS: "SUCCESS",
  RC: "successful",
  UID: "USER_ID",
  BC: "BANK_CODE",
  INI: "INITIATOR",
  P_AMT: "PAID_AMOUNT",
  R_AMT: "REFUNDED_AMOUNT",
  DV: "DIGITAL_SIGNATURE",
});
```

## API Reference

### createClient(merchantCode: string, secretKey: string, baseUrl?: string)

Creates a Fonepay client instance.

### initiatePayment(params: InitiatePaymentParams)

Initiates a payment request and returns a URL to redirect the user to.

### verifyResponse(response: FonepayResponse)

Verifies the payment response from Fonepay.

## Types

```typescript
type InitiatePaymentParams = {
  amount: number;
  prn: string;
  returnUrl: string;
  remarks1?: string;
  remarks2?: string;
  currency?: string;
};

type FonepayResponse = {
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
```

## License

ISC
