export type PaginatedData<T> = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
};

export interface PaginatedList<T extends { id: string }> {
  getPaginatedData: (page: number, pageSize: number) => PaginatedData<T>;
}
