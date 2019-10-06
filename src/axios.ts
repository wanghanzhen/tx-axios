import { AxiosInstance, AxiosRequestConfig, AxiosStatic } from "./type/index";
import Axios from "./core/Axios";
import { extend } from "./helpers/utils";
import defaults from "./defaults";
import mergeConfig from "./core/mergeConfig";

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config);
  const instace = Axios.prototype.request.bind(context);

  extend(instace, context);
  
  return instace as AxiosStatic;
}

const axios = createInstance(defaults);

axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config));
}

export default axios;