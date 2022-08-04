import { Button } from "@/components/UI/Button/Button";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import styles from "./FiltersToggle.module.scss";
import { useLockedBody } from "usehooks-ts";
import { FiSliders } from "react-icons/fi";
export const FiltersToggle = () => {
  const { openedFilters } = useTypedSelector((state) => state.toggleReducer);
  const { toggleFilters } = useActions();

  useLockedBody(openedFilters);

  const handleToggle = () => {
    toggleFilters(!openedFilters);
  };

  return (
    <Button
      variant="stroke"
      startIcon={<FiSliders />}
      className={styles.btn}
      onClick={handleToggle}
    >
      Фильтры
    </Button>
  );
};
