import { useActions } from "@/hooks/useActions";
import { useDebounce } from "@/hooks/useDebounce";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import classNames from "classnames";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiSearch, FiX } from "react-icons/fi";
import { useOnClickOutside } from "usehooks-ts";
import { ButtonBase } from "../UI/ButtonBase/ButtonBase";
import { TextField } from "../UI/TextField/TextField";
import { SearchList } from "./components/SearchList/SearchList";
import styles from "./Search.module.scss";
export const Search = () => {
  const { searchs } = useTypedSelector((state) => state.searchReducer);
  const { setVisible, setSearch } = useActions();

  const [value, setValue] = useState<string>("");
  const { debouncedValue, setDebouncedValue } = useDebounce(value.trim(), 300);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const submitForm = (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault();
    setVisible(false);
    setSearch(value);
    router.push(`/${searchs.type}/search?text=${value}`);
  };

  useEffect(() => {
    setVisible(false);
    setValue("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const handleClearInput = () => {
    setValue("");
    setVisible(false);
    setDebouncedValue("");
  };

  useOnClickOutside(formRef, () => setVisible(false));

  const isActive = debouncedValue && searchs.visible;

  const openSearch = () => {
    setVisible(true);
    inputRef.current?.focus();
  };

  return (
    <>
      <form
        onSubmit={submitForm}
        ref={formRef}
        action="#"
        className={classNames(styles.form, searchs.visible && styles.visible)}
      >
        <div className={styles.cont}>
          <TextField
            className={styles.search}
            ref={inputRef}
            variant="dark"
            type="search"
            value={value}
            onChange={handleChange}
            placeholder="Поиск..."
            onClick={() => setVisible(true)}
          />
          <ButtonBase
            ripple
            type="button"
            className={classNames(styles.closeBtn, value && styles.active)}
            onClick={handleClearInput}
          >
            <FiX />
          </ButtonBase>
        </div>
        <ButtonBase
          ripple
          type="button"
          className={styles.hideSearch}
          onClick={() => setVisible(false)}
        >
          <FiChevronLeft />
        </ButtonBase>

        {isActive && <SearchList value={debouncedValue} />}
      </form>
      <ButtonBase ripple onClick={openSearch} className={styles.searchBtn}>
        <FiSearch />
      </ButtonBase>
      <ButtonBase onClick={openSearch} className={styles.openSearch}>
        <FiSearch />
      </ButtonBase>
    </>
  );
};
