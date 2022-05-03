import { atom } from "recoil";
import { Cat } from "./models";

const catsState = atom<Partial<Cat>[]>({
  key: "cats",
  default: []
});

const sessionState = atom({
  key: "session",
  default: {
    user: {
      displayName: "John Doe",
      userName: "jdoe",
    },
  },
});

const spinnerState = atom({
  key: "progressDialog",
  default: {
    isOpen: false,
  },
});

export { catsState, spinnerState, sessionState };
