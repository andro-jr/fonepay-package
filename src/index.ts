/**
 * @module fonepay-node
 * A Node.js package for integrating Fonepay payment gateway services.
 * This module provides a simple interface to initiate payments and verify
 * payment responses from Fonepay's payment gateway.
 *
 * @example
 * ```typescript
 * import { createClient, FonepayResponse } from 'fonepay-node';
 *
 * const fonepay = createClient({
 *   merchantCode: 'YOUR_MERCHANT_CODE',
 *   secretKey: 'YOUR_SECRET_KEY',
 *   fonepayBaseUrl: 'FONEPAY_API_URL'
 * });
 *
 * // Example of using FonepayResponse type with req.query
 * app.get('/verify', (req, res) => {
 *   const response = req.query as FonepayResponse;
 *   const isValid = fonepay.verifyResponse(response);
 * });
 * ```
 */

export { createClient } from "./client/fonepayClient";
export type { FonepayResponse } from "./types/index";
