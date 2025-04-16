/**
 * @module fonepay-node
 * A Node.js package for integrating Fonepay payment gateway services.
 * This module provides a simple interface to initiate payments and verify
 * payment responses from Fonepay's payment gateway.
 *
 * @example
 * ```typescript
 * import { createClient } from 'fonepay-node';
 *
 * const fonepay = createClient({
 *   merchantCode: 'YOUR_MERCHANT_CODE',
 *   secretKey: 'YOUR_SECRET_KEY',
 *   fonepayBaseUrl: 'FONEPAY_API_URL'
 * });
 * ```
 */

export { createClient } from "./client/fonepayClient";
