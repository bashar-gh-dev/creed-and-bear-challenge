export interface DataBase<T extends { id: string }> {
  get: (id: string) => T | undefined;
  add: (item: Omit<T, "id">) => void;
  edit: (id: string, item: Partial<Omit<T, "id">>) => void;
  delete: (id: string) => void;
  list: () => T[];
}
