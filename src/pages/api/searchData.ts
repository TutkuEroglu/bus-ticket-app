import type { NextApiRequest, NextApiResponse } from "next"
import { SearchResultsInterface} from "../../types/index";
import { apiData } from "../../mockData/apiData"


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResultsInterface | []>
) {
  const result = apiData.busServices.find(bus => req.query.id === bus.id.toString());
  if (result) {
    res.status(200).json(result)
  } else {
    res.status(200).json([])
  }
}