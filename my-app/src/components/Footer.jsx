import { useDispatch, useSelector } from "react-redux";
import { ToggleTheme } from "../redux/counter/ThemeSlice";
import { useEffect } from "react";

const Footer = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  console.log(theme);
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <footer className={`footer dark:bg-amber-50  ${theme}`}>
      {/*<button onClick={() => dispatch(ToggleTheme())} className="">
        change color
      </button>*/ }
      <p>© {new Date().getFullYear()} MyApp. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
