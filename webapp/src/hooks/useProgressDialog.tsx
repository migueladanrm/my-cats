import { useRecoilState } from "recoil";
import { progressSpinnerState } from "../AppState";

export default function useProgressSpinner() {
  const [progressSpinner, setProgressSpinner] =
    useRecoilState(progressSpinnerState);

  const show = (isOpen: boolean) => {
    setProgressSpinner({ isOpen });
  };

  return {
    isOpen: progressSpinner.isOpen,
    show,
  };
}
