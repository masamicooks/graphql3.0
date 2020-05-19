import { useParams } from "react-router";

export default (p) => {
  const params = useParams();
  const param = params[p];
  if (!param) {
    throw new Error(`Parameter ${p} is requred.`);
  }
  return param;
};
