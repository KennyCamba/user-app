import httpClient from "./http-client";

export interface UserDto {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UserDto[];
}

class UserService {
  async getAll(page = 1, limit = 5): Promise<ApiResponse> {
    return httpClient
      .get("/users", {
        params: {
          page: page,
          per_page: limit,
        },
      })
      .then((response) => {
        if (response.data) {
          return response.data;
        }
      });
  }
}

export default new UserService();
