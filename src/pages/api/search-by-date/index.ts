import type { NextApiRequest, NextApiResponse } from "next"
import { BusServicesInterface } from "../../../types/index";
import { apiData } from "../../../mockData/apiData"


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<BusServicesInterface[] | []>
) {
  const {departure, arrival, date} = JSON.parse(req.body);
  const filteredResults = apiData.busServices.filter((result) => {
    return (
      result.departureLocation === departure &&
          result.arrivalLocation === arrival &&
          result.date === date
    );
  });
  if (filteredResults) {
    res.status(200).json(filteredResults)
  } else {
    res.status(200).json([])
  }
}