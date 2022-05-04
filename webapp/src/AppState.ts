import { atom } from "recoil";
import { Cat } from "./models";

const catsState = atom<Partial<Cat>[]>({
  key: "cats",
  default: [],
});

const spinnerState = atom({
  key: "progressDialog",
  default: {
    isOpen: false,
  },
});

export { catsState, spinnerState };
