import { useRecoilState } from "recoil";
import { spinnerState } from "../AppState";

export default function useSpinner() {
  const [spinner, setSpinner] =
    useRecoilState(spinnerState);

  const show = (isOpen: boolean) => {
    setSpinner({ isOpen });
  };

  return {
    isOpen: spinner.isOpen,
    show,
  };
}
