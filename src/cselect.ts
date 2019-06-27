import { select } from "./select";

export const cselect = <TObj, TResult>(
  selector: (subject: TObj) => TResult
) => (subject: TObj) => {
  return select(subject, selector);
};
