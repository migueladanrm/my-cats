import { atom } from "recoil";
import { Cat } from "./models";

const catsState = atom<Cat[]>({
  key: "cats",
  default: [
    {
      id: "gato-0",
      name: "Gato #0",
    },
    {
      id: "gato-1",
      name: "Gato #1",
    },
    {
      id: "gato-2",
      name: "Gato #2",
    },
    {
      id: "gato-3",
      name: "Gato #3",
    },
    {
      id: "gato-4",
      name: "Gato #4",
    },
    {
      id: "gato-5",
      name: "Gato #5",
    },
  ].map((c) => ({ ...c, profilePicture: "https://thiscatdoesnotexist.com" })),
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

export { catsState, sessionState };
