import axios from "axios";

export default axios.create({
  baseURL: "http://<your_IPv4>:3000/api/v1",
});
