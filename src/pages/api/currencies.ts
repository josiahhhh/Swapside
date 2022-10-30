import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = await axios.get(`https://changenow.io/api/v1/currencies`);

    return res.status(200).send(data);
  } catch (error) {
    console.log(error);
    return res.status(201).json({ msg: "API fetching failed" });
  }
}
