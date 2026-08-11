import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

/**
 * PesaPal IPN (Instant Payment Notification) Handler
 * 
 * This endpoint is called by PesaPal whenever a transaction status changes.
 * 1. Receive OrderTrackingId and OrderMerchantReference.
 * 2. Authenticate with PesaPal to get a Bearer token.
 * 3. Call GetTransactionStatus to verify the actual status.
 * 4. Update your database/records accordingly.
 */

const PESAPAL_URLS = {
  sandbox: 'https://cybqa.pesapal.com/pesapalv3',
  production: 'https://pay.pesapal.com/v3'
};

const IS_PRODUCTION = process.env.PESAPAL_MODE === 'production';
const BASE_URL = IS_PRODUCTION ? PESAPAL_URLS.production : PESAPAL_URLS.sandbox;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // PesaPal IPN can be GET or POST depending on your registration choice
  const { OrderTrackingId, OrderMerchantReference, OrderNotificationType } = req.method === 'POST' ? req.body : req.query;

  if (!OrderTrackingId || !OrderMerchantReference) {
    return res.status(400).json({ error: 'Invalid IPN payload' });
  }

  // We only care about IPNCHANGE notifications
  if (OrderNotificationType !== 'IPNCHANGE') {
    return res.status(200).json({ message: 'Notification received' });
  }

  const consumerKey = process.env.PESAPAL_CONSUMER_KEY;
  const consumerSecret = process.env.PESAPAL_CONSUMER_SECRET;

  if (!consumerKey || !consumerSecret) {
    console.error('IPN Error: Missing PesaPal credentials');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    // STEP 1: Get Access Token
    const authResponse = await axios.post(`${BASE_URL}/api/Auth/RequestToken`, {
      consumer_key: consumerKey,
      consumer_secret: consumerSecret
    }, {
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    });

    const token = authResponse.data.token;

    // STEP 2: Get Transaction Status
    const statusResponse = await axios.get(
      `${BASE_URL}/api/Transactions/GetTransactionStatus?orderTrackingId=${OrderTrackingId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      }
    );

    const transactionData = statusResponse.data;

    /**
     * STEP 3: Handle the status
     * transactionData.status_code meanings:
     * 0 - INVALID
     * 1 - COMPLETED
     * 2 - FAILED
     * 3 - REVERSED
     */
    console.log(`IPN Received for ${OrderMerchantReference}: Status ${transactionData.payment_status_description}`);

    // TODO: Add your database logic here to mark the donation as completed/failed
    // e.g., await db.donations.update({ where: { ref: OrderMerchantReference }, data: { status: transactionData.status_code } });

    // PesaPal expects a specific response format to acknowledge the IPN
    return res.status(200).json({
      order_tracking_id: OrderTrackingId,
      merchant_reference: OrderMerchantReference,
      status: "200"
    });

  } catch (error: any) {
    console.error('IPN Processing Error:', error.response?.data || error.message);
    // Return 500 so PesaPal retries the notification
    return res.status(500).json({ error: 'Failed to process IPN' });
  }
}
