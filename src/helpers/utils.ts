import { Method } from "../type";

const toString = Object.prototype.toString;

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]';
}

// export function isObject(val: any): val is Object {
//   return val !== null && typeof val === 'object';
// }

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]';
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key  in from) {
    ;(to as T & U)[key] = from [key] as any;
  }

  return (to as T & U);
}

export function deepMerge(...arr: any[]): any {
  const result = Object.create(null);
  arr.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key];
        if (isPlainObject(val)) {
          // 如果result[key]已经有值 且是对象 合并一下
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val);
          } else {
            result[key] = deepMerge(val);
          }
        } else {
          result[key] = val;
        }
      })
    }
  })

  return result;
}

export function flattenHeaders(headers:any, method: Method): any {
  if (!headers) {
    return headers;
  }

  headers = deepMerge(headers.common, headers[method], headers);

  const methodsToDelete = ['get', 'delete', 'post', 'put', 'head', 'options', 'patch', 'common'];
  methodsToDelete.forEach(method => {
    delete headers[method];
  })

  return headers;
}