import httpClient from "./http-client";

export interface UserDto {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
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

  async update(user: UserDto): Promise<UserDto> {
    const data = {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      avatar: user.avatar,
    };

    return httpClient.put(`/users/${user.id}`, data).then((response) => {
      if (response.data) {
        return response.data;
      }
    });
  }

  async create(user: UserDto): Promise<UserDto> {
    const data = {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    };

    return httpClient.post("/users", data).then((response) => {
      if (response.data) {
        return response.data;
      }
    });
  }

  async delete(id: number): Promise<boolean> {
    return httpClient.delete(`/users/${id}`).then((response) => {
      return response.status == 204;
    });
  }
}

export default new UserService();
