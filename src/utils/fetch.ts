import axios from "axios";

const BASE_URL = "https://swap-eight-omega.vercel.app";

export default async function getCurrencies() {
  return await axios.get(`${BASE_URL}/api/currencies`);
}

export async function getExchangeRates(currency: string) {
  return await axios.get(`${BASE_URL}/api/rates?currency=${currency}`);
}

export async function compareExchangeRates(
  amount: number,
  from: string,
  to: string
) {
  return await axios.get(
    `${BASE_URL}/api/compareAmount?amount=${amount}&from=${from}&to=${to}`
  );
}

export function createTransaction(data: any) {
  return axios.post(`${BASE_URL}/api/create`, data);
}
