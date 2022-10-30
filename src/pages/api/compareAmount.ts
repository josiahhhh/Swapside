import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { amount, from, to } = req.query;

    const { data } = await axios.get(
      `https://api.changenow.io/v1/exchange-amount/${amount}/${from}_${to}?api_key=33a8d0ef1239b54dca56b0873a5a4bb1b983813570f4e30801c5b52cab409b3e`
    );

    return res.status(200).send(data);
  } catch (error) {
    console.log(error);
    return res.status(201).json({ msg: "API fetching failed" });
  }
}
