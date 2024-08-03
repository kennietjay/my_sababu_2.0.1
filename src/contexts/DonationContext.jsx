/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";
import supabase from "../../utils/supabase";

const DonationContext = createContext();

const initialState = {
  isLoading: false,
  donations: [],
  donation: {},
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: action.payload, error: null };

    case "donations/loaded":
      return { ...state, isLoading: false, donations: action.payload };

    case "donation/loaded":
      return { ...state, isLoading: false, donation: action.payload };

    case "donation/donated":
      return {
        ...state,
        isLoading: false,
        donations: [...state.donations, action.payload],
      };

    case "donation/updated":
      return {
        ...state,
        isLoading: false,
        donations: state.donations.map((donation) =>
          donation.id === action.payload.id ? action.payload : donation
        ),
      };

    case "donation/deleted":
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

function DonationProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getDonation = useCallback(async () => {
    dispatch({ type: "loading", payload: true });

    try {
      const { data, error } = await supabase.from("donations").select("*");

      if (error) throw error;

      dispatch({ type: "donations/loaded", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  }, []);

  const createDonation = async (donation) => {
    try {
      const { data, error } = await supabase
        .from("donations")
        .insert([donation]);

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error("Error creating donation:", error);
      return { success: false, error };
    }
  };

  const checkDonationLimit = async (email, phone) => {
    try {
      const { data, error } = await supabase
        .from("donations")
        .select("*")
        .eq("email", email)
        .eq("phone", phone)
        .gt(
          "created_at",
          new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        );

      if (error) throw error;
      return data.length === 0;
    } catch (error) {
      console.error("Error checking donation limit:", error);
      return false;
    }
  };

  return (
    <DonationContext.Provider
      value={{ ...state, createDonation, getDonation, checkDonationLimit }}
    >
      {children}
    </DonationContext.Provider>
  );
}

const useDonation = () => {
  const context = useContext(DonationContext);

  if (!context) {
    throw new Error("useDonation must be used within a DonationProvider");
  }

  return context;
};

export { DonationProvider, useDonation };
