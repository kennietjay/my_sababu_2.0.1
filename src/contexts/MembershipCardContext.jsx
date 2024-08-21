/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useReducer } from "react";
import { useCallback, useContext } from "react";
import supabase from "../../utils/supabase";

const MembershipCardContext = createContext();

const initialState = {
  isLoading: false,
  signups: [],
  signup: {},
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: action.payload, error: null };

    case "signups/loaded":
      return { ...state, isLoading: false, signups: action.payload };

    case "signup/loaded":
      return { ...state, isLoading: false, signup: action.payload };

    case "signup/subscribed":
      return {
        ...state,
        isLoading: false,
        signups: [...state.signups, action.payload],
      };

    case "signup/updated":
      return {
        ...state,
        isLoading: false,
        signups: state.signups.map((signup) =>
          signup.id === action.payload.id ? action.payload : signup
        ),
      };

    case "signup/unsubscribed":
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

const MembershipCardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadSignups = useCallback(async () => {
    dispatch({ type: "loading", payload: true });

    try {
      const { data: signups, error } = await supabase
        .from("membership_cards")
        .select("*");

      if (error) throw error;

      dispatch({ type: "signups/loaded", payload: signups });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  }, []);

  const createSignup = async (formData) => {
    dispatch({ type: "loading", payload: true });

    try {
      const { data: newSubscriber, error } = await supabase
        .from("membership_cards")
        .insert(formData);

      if (error) throw error;

      loadSignups();

      dispatch({ type: "signup/subscribed", payload: newSubscriber[0] });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  };

  return (
    <MembershipCardContext.Provider
      value={{ ...state, loadSignups, createSignup }}
    >
      {children}
    </MembershipCardContext.Provider>
  );
};

const useMembershipCards = () => {
  const context = useContext(MembershipCardContext);

  if (!context) {
    throw new Error("useSignups must be used within a SignupProvider");
  }

  return context;
};

export { MembershipCardProvider, useMembershipCards };
