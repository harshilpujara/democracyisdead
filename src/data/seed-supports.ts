import type { PublicSupportRow } from "@/lib/supabase/types";

/**
 * ============================================================================
 *  SEED DATA — fake supporters rendered on the globe alongside real ones.
 *
 *  To remove seed data from the app entirely, delete the SEED_SUPPORTS
 *  spread wherever it's merged with live rows (currently one line in
 *  src/lib/supports/useSupports.ts: `...SEED_SUPPORTS,`). This file can
 *  then be deleted too.
 * ============================================================================
 */

const HOUR = 60 * 60 * 1000;
const now = Date.now();
/** Spreads seed rows across the last ~9 days so the feed doesn't look robotic. */
const hoursAgo = (h: number) => new Date(now - h * HOUR).toISOString();

interface SeedEntry {
  city: string;
  lat: number;
  lng: number;
  name: string | null;
  message?: string;
  hoursAgo: number;
}

const ENTRIES: SeedEntry[] = [
  { city: "Delhi", lat: 28.6139, lng: 77.209, name: "Aarav Sharma", message: "Was there at Jantar Mantar. Still here.", hoursAgo: 2 },
  { city: "Mumbai", lat: 19.076, lng: 72.8777, name: null, hoursAgo: 4 },
  { city: "Bengaluru", lat: 12.9716, lng: 77.5946, name: "Priya Nair", message: "For every answer that never came.", hoursAgo: 6 },
  { city: "Hyderabad", lat: 17.385, lng: 78.4867, name: "Kabir Reddy", hoursAgo: 9 },
  { city: "Chennai", lat: 13.0827, lng: 80.2707, name: null, message: "Recording, not rioting.", hoursAgo: 11 },
  { city: "Kolkata", lat: 22.5726, lng: 88.3639, name: "Ananya Sen", hoursAgo: 14 },
  { city: "Pune", lat: 18.5204, lng: 73.8567, name: "Rohan Deshmukh", hoursAgo: 17 },
  { city: "Ahmedabad", lat: 23.0225, lng: 72.5714, name: null, hoursAgo: 19 },
  { city: "Jaipur", lat: 26.9124, lng: 75.7873, name: "Ishita Rathore", message: "My exam year too.", hoursAgo: 22 },
  { city: "Lucknow", lat: 26.8467, lng: 80.9462, name: "Vivaan Tiwari", hoursAgo: 25 },
  { city: "Chandigarh", lat: 30.7333, lng: 76.7794, name: null, hoursAgo: 28 },
  { city: "Bhopal", lat: 23.2599, lng: 77.4126, name: "Saanvi Malhotra", hoursAgo: 31 },
  { city: "Indore", lat: 22.7196, lng: 75.8577, name: "Arjun Patil", message: "Counted, from Indore.", hoursAgo: 34 },
  { city: "Nagpur", lat: 21.1458, lng: 79.0882, name: null, hoursAgo: 37 },
  { city: "Patna", lat: 25.5941, lng: 85.1376, name: "Diya Kumar", hoursAgo: 40 },
  { city: "Surat", lat: 21.1702, lng: 72.8311, name: "Aditya Shah", hoursAgo: 43 },
  { city: "Kanpur", lat: 26.4499, lng: 80.3319, name: null, hoursAgo: 46 },
  { city: "Kochi", lat: 9.9312, lng: 76.2673, name: "Meera Pillai", message: "Kerala is watching too.", hoursAgo: 49 },
  { city: "Thiruvananthapuram", lat: 8.5241, lng: 76.9366, name: "Nikhil Menon", hoursAgo: 52 },
  { city: "Guwahati", lat: 26.1445, lng: 91.7362, name: null, hoursAgo: 55 },
  { city: "Bhubaneswar", lat: 20.2961, lng: 85.8245, name: "Sneha Mohanty", hoursAgo: 58 },
  { city: "Ranchi", lat: 23.3441, lng: 85.3096, name: "Yash Oraon", hoursAgo: 61 },
  { city: "Raipur", lat: 21.2514, lng: 81.6296, name: null, hoursAgo: 64 },
  { city: "Dehradun", lat: 30.3165, lng: 78.0322, name: "Kavya Rawat", hoursAgo: 67 },
  { city: "Shimla", lat: 31.1048, lng: 77.1734, name: "Dev Thakur", message: "Small town, same anger.", hoursAgo: 70 },
  { city: "Amritsar", lat: 31.634, lng: 74.8723, name: null, hoursAgo: 73 },
  { city: "Varanasi", lat: 25.3176, lng: 82.9739, name: "Aditi Pandey", hoursAgo: 76 },
  { city: "Nashik", lat: 19.9975, lng: 73.7898, name: "Om Jadhav", hoursAgo: 79 },
  { city: "Vadodara", lat: 22.3072, lng: 73.1812, name: null, hoursAgo: 82 },
  { city: "Coimbatore", lat: 11.0168, lng: 76.9558, name: "Lakshmi Raman", hoursAgo: 85 },
  { city: "Madurai", lat: 9.9252, lng: 78.1198, name: "Karthik Subramaniam", message: "This is about accountability.", hoursAgo: 88 },
  { city: "Visakhapatnam", lat: 17.6868, lng: 83.2185, name: null, hoursAgo: 91 },
  { city: "Mysuru", lat: 12.2958, lng: 76.6394, name: "Tanvi Gowda", hoursAgo: 94 },
  { city: "Jodhpur", lat: 26.2389, lng: 73.0243, name: "Rehan Khan", hoursAgo: 97 },
  { city: "Udaipur", lat: 24.5854, lng: 73.7125, name: null, hoursAgo: 100 },
  { city: "Agra", lat: 27.1767, lng: 78.0081, name: "Zara Siddiqui", hoursAgo: 103 },
  { city: "Meerut", lat: 28.9845, lng: 77.7064, name: "Harsh Chaudhary", hoursAgo: 106 },
  { city: "Ludhiana", lat: 30.901, lng: 75.8573, name: null, message: "Punjab stands with the students.", hoursAgo: 109 },
  { city: "Srinagar", lat: 34.0837, lng: 74.7973, name: "Insha Bhat", hoursAgo: 112 },
  { city: "Guntur", lat: 16.3067, lng: 80.4365, name: "Charan Naidu", hoursAgo: 115 },
  { city: "Vijayawada", lat: 16.5062, lng: 80.648, name: null, hoursAgo: 118 },
  { city: "Mangaluru", lat: 12.9141, lng: 74.856, name: "Shreya Kamath", hoursAgo: 121 },
  { city: "Thane", lat: 19.2183, lng: 72.9781, name: "Aryan Kulkarni", hoursAgo: 124 },
  { city: "Faridabad", lat: 28.4089, lng: 77.3178, name: null, hoursAgo: 127 },
  { city: "Gurugram", lat: 28.4595, lng: 77.0266, name: "Naina Bhatia", hoursAgo: 130 },
  { city: "Noida", lat: 28.5355, lng: 77.391, name: "Rudra Yadav", message: "Recording everything.", hoursAgo: 133 },
  { city: "Rajkot", lat: 22.3039, lng: 70.8022, name: null, hoursAgo: 136 },
  { city: "Jamshedpur", lat: 22.8046, lng: 86.2029, name: "Esha Mahato", hoursAgo: 139 },
  { city: "Siliguri", lat: 26.7271, lng: 88.3953, name: "Bikram Rai", hoursAgo: 142 },
  { city: "Imphal", lat: 24.817, lng: 93.9368, name: null, hoursAgo: 145 },
  { city: "Shillong", lat: 25.5788, lng: 91.8933, name: "Ibalarihun Lyngdoh", hoursAgo: 148 },
  { city: "Panaji", lat: 15.4909, lng: 73.8278, name: "Clive Fernandes", message: "Small state, loud voice.", hoursAgo: 151 },
  { city: "Puducherry", lat: 11.9416, lng: 79.8083, name: null, hoursAgo: 154 },
  { city: "Dhanbad", lat: 23.7957, lng: 86.4304, name: "Ritika Verma", hoursAgo: 157 },
  { city: "Aligarh", lat: 27.8974, lng: 78.088, name: "Faizan Ahmed", hoursAgo: 160 },
  { city: "London", lat: 51.5072, lng: -0.1276, name: "Simran Kaur", message: "Watching from the UK.", hoursAgo: 12 },
  { city: "New York", lat: 40.7128, lng: -74.006, name: null, hoursAgo: 27 },
  { city: "Toronto", lat: 43.6532, lng: -79.3832, name: "Manpreet Gill", hoursAgo: 45 },
  { city: "Dubai", lat: 25.2048, lng: 55.2708, name: "Fatima Ansari", message: "Diaspora is watching too.", hoursAgo: 63 },
  { city: "Singapore", lat: 1.3521, lng: 103.8198, name: null, hoursAgo: 81 },
  { city: "Sydney", lat: -33.8688, lng: 151.2093, name: "Neha Joshi", hoursAgo: 99 },
  { city: "San Francisco", lat: 37.7749, lng: -122.4194, name: "Arun Iyer", message: "Bay Area is with Delhi.", hoursAgo: 117 },
  { city: "Melbourne", lat: -37.8136, lng: 144.9631, name: null, hoursAgo: 135 },
];

export const SEED_SUPPORTS: PublicSupportRow[] = ENTRIES.map((entry, index) => ({
  id: `seed-${index}`,
  created_at: hoursAgo(entry.hoursAgo),
  city: entry.city,
  lat: entry.lat,
  lng: entry.lng,
  message: entry.message ?? null,
  display_name: entry.name,
}));
