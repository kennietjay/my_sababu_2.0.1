import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";
import supabase from "../../utils/supabase";

const VolunteerContext = createContext();

const initialState = {
  isLoading: false,
  volunteers: [],
  volunteer: {},
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: action.payload, error: null };

    case "volunteers/loaded":
      return { ...state, isLoading: false, volunteers: action.payload };

    case "volunteer/loaded":
      return { ...state, isLoading: false, volunteer: action.payload };

    case "volunteer/created":
      return {
        ...state,
        isLoading: false,
        volunteers: [...state.volunteers, action.payload],
      };

    case "volunteer/updated":
      return {
        ...state,
        isLoading: false,
        volunteers: state.volunteers.map((volunteer) =>
          volunteer.id === action.payload.id ? action.payload : volunteer
        ),
      };

    case "volunteer/deleted":
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

function VolunteerProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getVolunteers = useCallback(async () => {
    dispatch({ type: "loading", payload: true });

    try {
      const { data, error } = await supabase.from("volunteers").select("*");

      if (error) throw error;

      dispatch({ type: "volunteers/loaded", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  }, []);

  const createVolunteer = async (formData) => {
    dispatch({ type: "loading", payload: true });

    try {
      const { data: newVolunteer, error } = await supabase
        .from("volunteers")
        .insert(formData);

      if (error) throw error;

      dispatch({ type: "volunteer/created", payload: newVolunteer });
      //
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  };

  return (
    <VolunteerContext.Provider
      value={{ ...state, createVolunteer, getVolunteers }}
    >
      {children}
    </VolunteerContext.Provider>
  );
}

const useVolunteer = () => {
  const context = useContext(VolunteerContext);

  if (!context) {
    throw new Error("useVolunteer must be used within a VolunteerProvider");
  }

  return context;
};

export { VolunteerProvider, useVolunteer };
