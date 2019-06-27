const proxify = <TObj extends {}>(
  target: TObj,
  handler: ProxyHandler<TObj>
) => {
  return new Proxy(target, handler);
};

// TODO: type any
const handler: ProxyHandler<any> = {
  get: function(target, prop, receiver) {
    const res = Reflect.get(target, prop, receiver);
    return typeof res === "object" ? proxify(res, handler) : res;
  }
};

export const proxyselect = <TObj, TResult>(
  subject: TObj,
  selector: (obj: TObj) => TResult
) => selector(proxify(subject || {}, handler));
