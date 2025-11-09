import { ApiService } from "./apiService";

//Service instances for different API endpoints
export const notesService = new ApiService("/notes");

export const usersService = new ApiService("/users");
