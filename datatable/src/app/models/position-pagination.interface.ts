import { PositionType } from "./position.model";

export interface PositionPagination {
  count: number;
  next: string | null;
  previous: string | null;
  results: PositionType[];
}
