import { EmployeeType } from "./employee.model";

export interface EmployeePagination {
  count: number;
  next: string | null;
  previous: string | null;
  results: EmployeeType[];
}
