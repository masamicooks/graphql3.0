import { resolver as taskResolver } from "./task";
import { resolver as userResolver } from "./user";
import { resolver as hearingResolver } from "./hearing";
import { resolver as scalarResolver } from "./scalar";

export default [taskResolver, userResolver, scalarResolver, hearingResolver];
