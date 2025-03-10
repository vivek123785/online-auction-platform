import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Change for production
const AUCTION_API_URL = "http://localhost:5000/api/auction"; // API for auction-related requests

// 📌 Helper function for API calls (DRY principle)
const apiRequest = async (url, method = "GET", body = null) => {
  try {
    const options = {
      method,
      url,
      headers: { "Content-Type": "application/json" },
      data: body, // 'data' is used in axios for the request body
    };

    const response = await axios(options);
    return response.data; // Return the data from the response
  } catch (error) {
    console.error(`API error: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
    return { error: error.response ? error.response.data : "Network error" };
  }
};

// ✅ Register a new user
export const registerUser = async (userData) => {
  return await apiRequest(`${API_URL}/register`, "POST", userData);
};

// ✅ Log in a user
export const loginUser = async (credentials) => {
  return await apiRequest(`${API_URL}/login`, "POST", credentials);
};

// ✅ Fetch user profile (protected route)
export const fetchUserProfile = async (token) => {
  return await apiRequest(`${API_URL}/profile`, "GET", null, {
    Authorization: `Bearer ${token}`,
  });
};

// ✅ Fetch all auctions
export const fetchAuctions = async () => {
  return await apiRequest(`${AUCTION_API_URL}/`);
};

// ✅ Fetch featured auction items
export const fetchFeaturedItems = async () => {
  try {
    const response = await axios.get(`${AUCTION_API_URL}/featured`);
    return response.data || []; // Ensure it returns an array
  } catch (error) {
    console.error("Error fetching featured items:", error);
    return []; // Return empty array if there's an error
  }
};

// ✅ Fetch auction by ID
export const fetchAuctionById = async (auctionId) => {
  return await apiRequest(`${AUCTION_API_URL}/${auctionId}`);
};

// ✅ Create a new auction
export const createAuction = async (auctionData) => {
  return await apiRequest(`${AUCTION_API_URL}/`, "POST", auctionData);
};

// ✅ Update an existing auction
export const updateAuction = async (auctionId, updatedData) => {
  return await apiRequest(`${AUCTION_API_URL}/${auctionId}`, "PUT", updatedData);
};

// ✅ Delete an auction
export const deleteAuction = async (auctionId) => {
  return await apiRequest(`${AUCTION_API_URL}/${auctionId}`, "DELETE");
};
