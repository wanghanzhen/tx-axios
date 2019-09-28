import { ResovledFn, RejectedFn } from "../type";

interface Interceptor<T> {
  resolved: ResovledFn<T>
  rejected?: RejectedFn
}
export default class InterceptorManager<T> {
  private interceptors:Array<Interceptor<T> | null>;

  constructor() {
    this.interceptors= [];
  }

  use(resolved: ResovledFn<T>, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected,
    });

    return this.interceptors.length - 1;
  }

  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor);
      }
    })
  }
  
  eject(id: number): void {
    if (this.interceptors[id]) {
      // 使用splice会导致数组下标改变 id不对应
      this.interceptors[id] = null;
    }
  }
}