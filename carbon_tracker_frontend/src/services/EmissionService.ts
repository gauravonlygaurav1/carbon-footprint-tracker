import useAuth from "@/Auth/store";
import apiClient from "@/config/ApiClient";
import type { EmissionResponse } from "@/models/EmissionResponse";

// DRIVING
export const calculateDriving = async (data: {
  distance: number;
  vehicleType: string;
}) => {
  const res = await apiClient.post<EmissionResponse>(
    "/emission/driving",
    data
  );
  return res.data;
};

// ELECTRICITY
export const calculateElectricity = async (data: {
  consumption: number;
}) => {
  const res = await apiClient.post<EmissionResponse>(
    "/emission/electricity",
    data
  );
  return res.data;
};

// FOOD
export const calculateFood = async (data: {
  foodType: string;
  weightKg: number;
}) => {
  const res = await apiClient.post<EmissionResponse>(
    "/emission/food",
    data
  );
  return res.data;
};

// FLIGHT
export const calculateFlight = async (data: {
  source: string;
  destination: string;
  flightType: string;
}) => {
  const res = await apiClient.post<EmissionResponse>(
    "/emission/flight",
    data
  );
  return res.data;
};

//DASHBOARD SUMMARY
export const getDashboardSummary = async () => {

    const res = await apiClient.get("/emission/dashboard");;
    
    return res.data;
}

//ANALYTICS
export const getWeeklyAnalytics = async () => {

    const res = await apiClient.get("/emission/analytics");

    return res.data;
}

export const createGoal = async (data: {targetEmission: number;}) => {

  const res = await apiClient.post("/emission/goal", data);

  return res.data;
};

export const getGoalProgress = async () => {

  const res = await apiClient.get("/emission/goal");

  return res.data;

};