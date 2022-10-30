import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { currency } = req.query;

    const { data } = await axios.get(
      `thtps://api.coinbase.com/v2/exchange-rates?currency=${currency}`
    );

    return res.status(200).send(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "API fetching failed" });
  }
}
