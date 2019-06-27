import { proxyselect } from "./proxyselect";
import { trycatchselect } from "./trycatchselect";
import { isProxyCapable } from "./util";

export const select = isProxyCapable() ? proxyselect : trycatchselect;
