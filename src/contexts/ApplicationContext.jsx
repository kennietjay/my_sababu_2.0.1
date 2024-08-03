import React, { createContext, useContext, useReducer } from "react";
import supabase from "../../utils/supabase";

const ApplicationContext = createContext();

const initialState = {
  isLoading: false,
  applicants: [],
  applicant: {},
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: action.payload, error: null };

    case "applicants/loaded":
      return { ...state, isLoading: false, applicants: action.payload };

    case "applicant/loaded":
      return { ...state, isLoading: false, applicant: action.payload };

    case "applicant/applied":
      return {
        ...state,
        isLoading: false,
        applicants: [...state.applicants, action.payload],
      };

    case "applicant/updated":
      return {
        ...state,
        isLoading: false,
        applicants: state.applicants.map((applicant) =>
          applicant.id === action.payload.id ? action.payload : applicant
        ),
      };

    case "applicant/deleted":
      return {
        ...state,
        isLoading: false,
      };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      console.error("Unknown action type:", action.type);
      return state;
  }
};

function ApplicationProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const createApply = async (formData) => {
    dispatch({ type: "loading", payload: true });

    try {
      const { data: newApplicant, error } = await supabase
        .from("registrations")
        .insert(formData);

      if (error) throw error;

      dispatch({ type: "applicant/applied", payload: newApplicant });
      //
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  };

  return (
    <ApplicationContext.Provider value={{ ...state, createApply }}>
      {children}
    </ApplicationContext.Provider>
  );
}

const useApplicant = () => {
  const context = useContext(ApplicationContext);

  if (!context) {
    throw new Error("useSignups must be used within a SignupProvider");
  }

  return context;
};

export { ApplicationProvider, useApplicant };
