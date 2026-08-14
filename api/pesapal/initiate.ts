import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const PESAPAL_URLS = {
  sandbox: 'https://cybqa.pesapal.com/pesapalv3',
  production: 'https://pay.pesapal.com/v3'
};

const IS_PRODUCTION = process.env.PESAPAL_MODE === 'production';
const BASE_URL = IS_PRODUCTION ? PESAPAL_URLS.production : PESAPAL_URLS.sandbox;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { amount, description, email, firstName, lastName } = req.body;
  
  if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
    return res.status(400).json({ error: 'Invalid donation amount.' });
  }

  const consumerKey = process.env.PESAPAL_CONSUMER_KEY;
  const consumerSecret = process.env.PESAPAL_CONSUMER_SECRET;
  const ipnId = process.env.PESAPAL_IPN_ID;

  if (!consumerKey || !consumerSecret || !ipnId) {
    console.error('Missing PesaPal configuration in environment variables.');
    return res.status(500).json({ error: 'Gateway configuration is incomplete.' });
  }

  try {
    const authResponse = await axios.post(`${BASE_URL}/api/Auth/RequestToken`, {
      consumer_key: consumerKey,
      consumer_secret: consumerSecret
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    const token = authResponse.data.token;
    if (!token) {
      throw new Error('PesaPal Authentication failed: No token returned.');
    }

    const merchantReference = `GII-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const paymentPayload = {
      id: merchantReference,
      currency: "KES",
      amount: parseFloat(amount),
      description: description || "Climate education and forest garden funding support",
      callback_url: process.env.PESAPAL_CALLBACK_URL || "https://greenimpactinnovators.works/donation/success",
      notification_id: ipnId,
      billing_address: {
        email_address: email || "donor@greenimpactinnovators.works",
        first_name: firstName || "Anonymous",
        last_name: lastName || "Donor",
        country_code: "KE"
      }
    };

    const orderResponse = await axios.post(
      `${BASE_URL}/api/Transactions/SubmitOrderRequest`,
      paymentPayload,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );

    if (orderResponse.data && orderResponse.data.redirect_url) {
      return res.status(200).json({ 
        redirect_url: orderResponse.data.redirect_url,
        order_tracking_id: orderResponse.data.order_tracking_id,
        merchant_reference: merchantReference
      });
    } else {
      throw new Error(orderResponse.data?.message || 'Failed to retrieve redirect URL.');
    }

  } catch (error: any) {
    const errorData = error.response?.data || error.message;
    console.error('PesaPal Integration Error:', errorData);
    
    return res.status(500).json({ 
      error: 'The payment gateway is currently unavailable. Please try again later.',
      debug: process.env.NODE_ENV === 'development' ? errorData : undefined
    });
  }
}
