import { api } from "@/lib/api";

/**
 * @param T Base type
 * @param CreateDTO Data to create
 * @param UpdateDTO Data to update
 * @returns functions to make CRUD operations
 */ 

export class BaseService<T, CreateDTO, UpdateDTO> {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getAll(): Promise<T[]> {
    const res = await api.get<T[]>(this.baseUrl, { withCredentials: true });
    return res.data;
  }

  async getById(id: string | number): Promise<T> {
    const res = await api.get<T>(`${this.baseUrl}/${id}`, {
      withCredentials: true,
    });
    return res.data;
  }

  async create(data: CreateDTO): Promise<T> {
    const res = await api.post<T>(this.baseUrl, data, {
      withCredentials: true,
    });
    return res.data;
  }

  async update(id: string | number, data: UpdateDTO): Promise<T> {
    const res = await api.put<T>(`${this.baseUrl}/${id}`, data, {
      withCredentials: true,
    });
    return res.data;
  }

  async delete(id: string | number): Promise<void> {
    await api.delete(`${this.baseUrl}/${id}`, { withCredentials: true });
  }
}
