import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data } = await axios.get(
      `https://financialmodelingprep.com/api/v3/stock_market/actives?apikey=64b9cb7bc28bb75e48c2508d805275c9`
    );

    return res.status(200).send(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'API fetching failed' });
  }
}
