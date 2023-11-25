import { legacy_createStore as createStore } from "redux";
import { ACTION_TYPE } from "../actions/guessAction";

const initialState = {
  count: 0,
  historyResults: JSON.parse(localStorage.getItem("guessResult")) || [],
  theme: localStorage.getItem("theme") || "dark",
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.ADD_TO_LIST: {
      const result = {
        ...state,
        historyResults: [action.payload, ...state.historyResults],
      };
      localStorage.setItem(
        "guessResult",
        JSON.stringify(result.historyResults)
      );
      return result;
    }
    case ACTION_TYPE.DELETE_LIST: {
      localStorage.removeItem("guessResult");
      return { ...state, historyResults: [] };
    }
    case "theme/toggle": {
      const val = state.theme === "light" ? "dark" : "light";
      document.body.classList.remove(state.theme);
      document.body.classList.add(val);
      localStorage.setItem("theme", val);
      return { ...state, theme: val };
    }
    default: {
      return state;
    }
  }
};
export const store = createStore(rootReducer);
