import { AxiosInstance } from "./type/index";
import Axios from "./core/Axios";
import { extend } from "./helpers/utils";

function createInstance(): AxiosInstance {
  const context = new Axios();
  const instace = Axios.prototype.request.bind(context);

  extend(instace, context);
  
  return instace as AxiosInstance;
}

const axios = createInstance();

export default axios;