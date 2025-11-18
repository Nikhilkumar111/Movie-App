import { useDispatch,useSelector } from "react-redux";
import { toggleDarkMode } from "../redux/features/theme/themeSlice";
import { AiOutlineBulb } from "react-icons/ai";

const DarkModeButton = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      className={`p-2 rounded-full transition-colors duration-300 ${
        darkMode ? "bg-gray-700 text-yellow-400" : "bg-gray-200 text-gray-800"
      }`}
      title="Toggle Dark Mode"
    >
      <AiOutlineBulb size={24} />
    </button>
  );
};

export default DarkModeButton;