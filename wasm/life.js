import * as wasm from "./life_bg.wasm";
import { __wbg_set_wasm } from "./life_bg.js";
__wbg_set_wasm(wasm);
export * from "./life_bg.js";
