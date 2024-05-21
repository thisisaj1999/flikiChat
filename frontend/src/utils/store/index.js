import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { globalSlice } from "./slices/globalSlice";

export const useGlobalStore = create(devtools((state) => globalSlice(state), {name : "Global Store"}))