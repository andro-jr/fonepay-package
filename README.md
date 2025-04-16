# Fonepay Integration Package

A TypeScript/JavaScript package for integrating Fonepay payment gateway into your Node.js applications.

## Installation

```bash
npm install fonepay-node
# or
yarn add fonepay-node
```

## Usage

```typescript
import { createClient } from "fonepay-node";

// Initialize the client
const fonepay = createClient({
  merchantCode: "YOUR_MERCHANT_CODE",
  secretKey: "YOUR_SECRET_KEY",
  fonepayBaseUrl: "https://dev-clientapi.fonepay.com/api/merchantRequest", // Use production URL in production
});

// Initiate a payment
const paymentResponse = fonepay.initiatePayment({
  amount: 1000,
  prn: "UNIQUE_REFERENCE",
  returnUrl: "https://your-site.com/api/payment/verify", // Your backend API endpoint that will handle the verification
  remarks1: "Payment for Order #123", // Required
  remarks2: "Optional detail", // Optional
  currency: "NPR", // Optional, defaults to NPR
});

// Redirect user to payment page if successful
if (paymentResponse.success) {
  // Redirect the user to the payment URL: url is obtained from the paymentResponse as url i.e paymentResponse.url
}

// On your backend API endpoint (returnUrl), verify the payment
// Example using Express.js
app.get("/api/payment/verify", (req, res) => {
  // Fonepay will redirect to this URL with query parameters
  const queryData = req.query;

  // If you are using ts typecast the values to string,
  const fonepayResponse = {
    PRN: queryData.PRN,
    PID: queryData.PID,
    PS: queryData.PS,
    RC: queryData.RC,
    UID: queryData.UID,
    BC: queryData.BC,
    INI: queryData.INI,
    P_AMT: queryData.P_AMT,
    R_AMT: queryData.R_AMT,
    DV: queryData.DV,
  };

  const isValid = fonepay.verifyResponse(fonepayResponse);
  // const isValid = fonepay.verifyResponse(req.query as any); you can pass the query data directly

  if (isValid) {
    // Payment is verified
    // Update your database
    // Redirect user to success page
    res.redirect("/payment/success");
  } else {
    // Payment verification failed
    res.redirect("/payment/failed");
  }
});
```

## API Reference

### createClient(params: FonepayClientParams)

Creates a Fonepay client instance with the following parameters:

```typescript
type FonepayClientParams = {
  merchantCode: string; // Merchant code provided by Fonepay
  secretKey: string; // Secret key for request verification
  fonepayBaseUrl: string; // Fonepay API base URL
};
```

### initiatePayment(params: InitiatePaymentParams)

Initiates a payment request and returns a payment URL.

```typescript
type InitiatePaymentParams = {
  amount: number; // Amount to be paid
  prn: string; // Unique Product Reference Number
  returnUrl: string; // Your backend API endpoint that will receive Fonepay's response
  remarks1: string; // Required remarks
  remarks2?: string; // Optional additional remarks
  currency?: string; // Optional, defaults to NPR
};

type InitiatePaymentResponse = {
  url: string; // Payment URL to redirect user to
  success: boolean; // Whether the URL was generated successfully
};
```

### verifyResponse(response: FonepayResponse)

Verifies the authenticity of a payment response from Fonepay. The response parameters are received as query parameters on your returnUrl endpoint.

> **Note**: You don't need to manually construct the FonepayResponse object. When Fonepay redirects to your returnUrl, all these parameters are automatically provided as query parameters (req.query in Express.js). Simply pass these query parameters to the verifyResponse function.

```typescript
type FonepayResponse = {
  PRN: string; // Product Reference Number (original reference you sent)
  PID: string; // Merchant ID / Product ID
  PS: string; // Payment Status ("success" or "failure")
  RC: string; // Response Code ("successful" for successful payments)
  UID: string; // Unique Transaction ID from Fonepay
  BC: string; // Bank Code that processed the payment
  INI: string; // Transaction Initiator
  P_AMT: string; // Paid Amount
  R_AMT: string; // Refunded Amount (if any)
  DV: string; // Digital Verification value for response validation
};
```

## Important Notes

1. The `returnUrl` should be a backend API endpoint (not a frontend route) that can:

   - Receive query parameters from Fonepay's redirect
   - Verify the payment response
   - Update your database with payment status
   - Redirect the user to appropriate success/failure pages

2. Always verify the payment response on your backend before confirming the payment to the user.

3. Store the `PRN` (Product Reference Number) in your database when initiating the payment so you can match it with the response.

## Error Handling

The package includes comprehensive error handling:

- All functions throw descriptive errors when required parameters are missing
- URL validation for both base URL and return URL
- Amount validation to ensure positive numbers
- Detailed error messages for debugging
- Safe handling of cryptographic operations

## Development

```bash
# Install dependencies
yarn install

# Build the package
yarn build
```

## License

ISC
