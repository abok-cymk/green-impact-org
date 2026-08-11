# PesaPal V3 Integration Notes

## Endpoints
- **Authentication**: `POST /api/Auth/RequestToken`
- **Order Submission**: `POST /api/Transactions/SubmitOrderRequest`
- **Transaction Status**: `GET /api/Transactions/GetTransactionStatus?orderTrackingId={id}`

## Base URLs
- **Sandbox**: `https://cybqa.pesapal.com/pesapalv3`
- **Production**: `https://pay.pesapal.com/v3`

## Implementation Details
- Bearer tokens are valid for 5 minutes.
- `notification_id` (IPN ID) is required for order submission.
- IPN alerts are sent for `IPNCHANGE` events.
- Security: Status must be verified via `GetTransactionStatus` after an IPN or callback, never trust client-side data.

## References
- [PesaPal API 3.0 Documentation](https://developer.pesapal.com/how-to-integrate/e-commerce/api-30-json/api-reference)
- [Authentication Guide](https://developer.pesapal.com/how-to-integrate/e-commerce/api-30-json/authentication)
- [SubmitOrderRequest Guide](https://developer.pesapal.com/how-to-integrate/e-commerce/api-30-json/submitorderrequest)
