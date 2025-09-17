import { createContext, useState, useReducer } from "react";

// Initial state for global state management
const initialState = {
  language: "en",
};

// Reducer function for state management
const stateReducer = (state, action) => {
  switch (action.type) {
    case "SET_LANGUAGE":
      return { ...state, language: action.payload };
    default:
      return state;
  }
};

const StateManagementContext = createContext();

export const StateManagementProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  // Actions
  const setLanguage = (language) => {
    dispatch({ type: "SET_LANGUAGE", payload: language });
  };

  const value = {
    ...state,
    setLanguage,
  };

  return (
    <StateManagementContext.Provider value={value}>
      {children}
    </StateManagementContext.Provider>
  );
};

export { StateManagementContext };
