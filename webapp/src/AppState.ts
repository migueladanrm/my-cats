import { atom } from "recoil";

const sessionState = atom({
  key: "session",
  default: {
    user: {
      displayName: "John Doe",
      userName: "jdoe",
    },
  },
});

export { sessionState };
