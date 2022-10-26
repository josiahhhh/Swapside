import axios from "axios";

axios.create({
  baseURL: "https://caveman-alerts.sensitiveperson.xyz",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axios;
