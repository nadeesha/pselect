export const trycatchselect = <TObj, TResult>(
  subject: TObj,
  selector: (obj: TObj) => TResult
) => {
  try {
    return selector(subject);
  } catch (e) {
    return undefined;
  }
};
