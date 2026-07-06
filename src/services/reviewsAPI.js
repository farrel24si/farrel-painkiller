import axios from 'axios';

const API_URL = "https://pnpdzlpxlathfnfzgdol.supabase.co/rest/v1/reviews";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBucGR6bHB4bGF0aGZuZnpnZG9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzMzg3MTAsImV4cCI6MjA5NjkxNDcxMH0.wQ6qy7pi1oPUcp0t-oCNyfUPirlZHew-gnfXdt7yc90";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const reviewsAPI = {
  async fetchReviews() {
    const response = await axios.get(`${API_URL}?select=*&order=created_at.desc`, { headers });
    return response.data;
  },

  async fetchReviewsByUserId(userId) {
    const response = await axios.get(`${API_URL}?user_id=eq.${userId}&select=*`, { headers });
    return response.data;
  },

  async createReview(data) {
    const response = await axios.post(API_URL, data, { headers });
    return response.data;
  },
  
  async checkReviewExists(bookingId) {
    const response = await axios.get(`${API_URL}?booking_id=eq.${bookingId}&select=id`, { headers });
    return response.data.length > 0;
  }
};
