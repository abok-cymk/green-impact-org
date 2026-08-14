import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const PESAPAL_URLS = {
  sandbox: 'https://cybqa.pesapal.com/pesapalv3',
  production: 'https://pay.pesapal.com/v3'
};

const IS_PRODUCTION = process.env.PESAPAL_MODE === 'production';
const BASE_URL = IS_PRODUCTION ? PESAPAL_URLS.production : PESAPAL_URLS.sandbox;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { OrderTrackingId, OrderMerchantReference, OrderNotificationType } = req.method === 'POST' ? req.body : req.query;

  if (!OrderTrackingId || !OrderMerchantReference) {
    return res.status(400).json({ error: 'Invalid IPN payload' });
  }

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
    const authResponse = await axios.post(`${BASE_URL}/api/Auth/RequestToken`, {
      consumer_key: consumerKey,
      consumer_secret: consumerSecret
    }, {
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    });

    const token = authResponse.data.token;

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
    console.log(`IPN Received for ${OrderMerchantReference}: Status ${transactionData.payment_status_description}`);

    return res.status(200).json({
      order_tracking_id: OrderTrackingId,
      merchant_reference: OrderMerchantReference,
      status: "200"
    });

  } catch (error: any) {
    console.error('IPN Processing Error:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to process IPN' });
  }
}
