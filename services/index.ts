import { ApiService } from "./apiService";

//Service instances for different API endpoints
export const notesServicePath = new ApiService("/notes");

export const tagsServicePath = new ApiService("/tags");

export const usersServicePath = new ApiService("/users");
