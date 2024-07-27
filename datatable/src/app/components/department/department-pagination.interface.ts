import { Department } from "@prisma/client";

export interface DepartmentPagination {
  count: number;
  next: string | null;
  previous: string | null;
  results: (Omit<Department, 'createdAt' | 'updatedAt'>)[] | []
}
