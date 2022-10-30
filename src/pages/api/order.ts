import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;

    const { data } = await axios.get(
      `https://api.changenow.io/v1/transactions/${id}/33a8d0ef1239b54dca56b0873a5a4bb1b983813570f4e30801c5b52cab409b3e`
    );

    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).json({ msg: "API fetching failed" });
  }
}
