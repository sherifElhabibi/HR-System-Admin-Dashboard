import { NextApiRequest , NextApiResponse} from "next";

export default async function get(
    req: NextApiRequest,
    res: NextApiResponse 
) {
    const result = req.query;
    res.status(200).json({ result });
  }