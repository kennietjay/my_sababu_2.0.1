/* eslint-disable react-refresh/only-export-components */
// src/contexts/SignupContext.jsx
import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";
import supabase from "../../utils/supabase";

// Adjust the import according to your project structure

const EventContext = createContext();

const initialState = {
  isLoading: false,
  events: [],
  event: {},
  signups: [],
  event_id: null,
  currentSignup: {},
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: action.payload, error: null };

    // Meetings
    case "events/loaded":
      return { ...state, isLoading: false, events: action.payload };
    case "event/loaded":
      return { ...state, isLoading: false, currentEvent: action.payload };

    //Signups
    case "signups/loaded":
      return { ...state, isLoading: false, signups: action.payload };
    case "signup/loaded":
      return { ...state, isLoading: false, currentSignup: action.payload };

    case "signup/created":
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
    case "signup/deleted":
      return {
        ...state,
        isLoading: false,
        signups: state.signups.filter((signup) => signup.id !== action.payload),
      };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      console.error("Unknown action type:", action.type);
      return state;
  }
};

const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getEvents = useCallback(async () => {
    dispatch({ type: "loading", payload: true });

    try {
      const { data, error } = await supabase
        .from("events")
        .select("*, eventsignups(*)");

      if (error) throw error;

      dispatch({ type: "events/loaded", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  }, []);

  const createSignup = async (signupData, eventId) => {
    try {
      dispatch({ type: "loading", payload: true });

      // Add meeting_id to signupData
      const signupWithMeetingId = {
        ...signupData,
        event_id: eventId,
      };

      const { data: newSignup, error } = await supabase
        .from("eventsignups")
        .insert(signupWithMeetingId);

      if (error) throw error;

      dispatch({ type: "signup/created", payload: newSignup[0] });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  };

  const getSignups = useCallback(async () => {
    dispatch({ type: "loading", payload: true });

    try {
      const { data: signups, error } = await supabase
        .from("eventsignups")
        .select("*, events(*)");
      if (error) throw error;

      dispatch({ type: "signups/loaded", payload: signups });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  }, []);

  return (
    <EventContext.Provider
      value={{
        ...state,
        getEvents,
        createSignup,
        getSignups,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

const useEvents = () => {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error("useSignups must be used within a SignupProvider");
  }

  return context;
};

export { EventProvider, useEvents };
