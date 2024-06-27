import { Employee } from "@prisma/client";

export interface EmployeePagination {
  count: number;
  next: string | null;
  previous: string | null;
  results: (Omit<Employee, 'createdAt' | 'updatedAt'> & {department: string} & {position: string})[] | []
}
