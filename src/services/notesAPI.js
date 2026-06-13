import axios from 'axios';

// Ganti URL dan API_KEY dengan milikmu yang ada di usersAPI.js!
// Bedanya, ujung URL ini adalah "/note" bukan "/users"
const API_URL = "https://pnpdzlpxlathfnfzgdol.supabase.co/rest/v1/notes";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBucGR6bHB4bGF0aGZuZnpnZG9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzMzg3MTAsImV4cCI6MjA5NjkxNDcxMH0.wQ6qy7pi1oPUcp0t-oCNyfUPirlZHew-gnfXdt7yc90";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const notesAPI = {
  async fetchNotes() {
    const response = await axios.get(`${API_URL}?select=*&order=id.desc`, { headers });
    return response.data;
  },

  async createNote(data) {
    const response = await axios.post(API_URL, data, { headers });
    return response.data;
  },

  async deleteNote(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
  }
};