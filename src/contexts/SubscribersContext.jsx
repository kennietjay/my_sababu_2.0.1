import React, { createContext, useReducer } from "react";
import { useCallback } from "react";
import supabase from "../../utils/supabase";
import { useContext } from "react";

const SubscriberContext = createContext();

const initialState = {
  isLoading: false,
  subscribers: [],
  subscriber: {},
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: action.payload, error: null };

    case "subscribers/loaded":
      return { ...state, isLoading: false, subscribers: action.payload };

    case "subscriber/loaded":
      return { ...state, isLoading: false, subscriber: action.payload };

    case "subscriber/subscribed":
      return {
        ...state,
        isLoading: false,
        subscribers: [...state.subscribers, action.payload],
      };

    case "subscriber/updated":
      return {
        ...state,
        isLoading: false,
        subscribers: state.subscribers.map((subscriber) =>
          subscriber.id === action.payload.id ? action.payload : subscriber
        ),
      };

    case "subscriber/unsubscribed":
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

const SubscribersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadSubscribers = useCallback(async () => {
    dispatch({ type: "loading", payload: true });

    try {
      const { data: subscribers, error } = await supabase
        .from("newslettersignups")
        .select("*");

      if (error) throw error;

      dispatch({ type: "subscribers/loaded", payload: subscribers });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  }, []);

  const createSubscriber = async (formData) => {
    dispatch({ type: "loading", payload: true });

    try {
      const { data: newSubscriber, error } = await supabase
        .from("newslettersignups")
        .insert(formData);

      if (error) throw error;

      loadSubscribers();

      dispatch({ type: "subscriber/subscribed", payload: newSubscriber[0] });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  };

  return (
    <SubscriberContext.Provider
      value={{ ...state, loadSubscribers, createSubscriber }}
    >
      {children}
    </SubscriberContext.Provider>
  );
};

const useSubscriber = () => {
  const context = useContext(SubscriberContext);

  if (!context) {
    throw new Error("useSignups must be used within a SignupProvider");
  }
  return context;
};

export { SubscribersProvider, useSubscriber };
