import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

API.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;

export async function getMemories() {
    const res = await fetch('/api/memories', { credentials: 'include' });
    if (!res.ok) throw new Error('Failed to load memories');
    return res.json();
  }