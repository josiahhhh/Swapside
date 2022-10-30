import axios from "axios";

export default async function getCurrencies() {
  return await axios.get(`https://swap-eight-omega.vercel.app/api/currencies`);
}

export async function getExchangeRates(currency: string) {
  return await axios.get(
    `https:/api.coinbase.com/v2/exchange-rates?currency=${currency}`
  );
}

export async function compareExchangeRates(
  amount: number,
  from: string,
  to: string
) {
  return await axios.get(
    `https://swap-eight-omega.vercel.app/api/compareAmount?amount=${amount}&from=${from}&to=${to}`
  );
}

export function createTransaction(data: any) {
  return axios.post(`https://swap-eight-omega.vercel.app/api/create`, data);
}
