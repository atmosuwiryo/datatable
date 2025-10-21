import { DepartmentType } from "./department.model";

export interface DepartmentPagination {
  count: number;
  next: string | null;
  previous: string | null;
  results: DepartmentType[];
}
