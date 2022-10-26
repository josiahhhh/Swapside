import axios from "./index";

export default function getEarningsCalendar(from: string, to: string) {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/v2/earnings`, {
        params: {
          from: from,
          to: to,
        },
      })
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
}
