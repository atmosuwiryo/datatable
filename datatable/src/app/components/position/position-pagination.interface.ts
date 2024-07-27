import { Position } from "@prisma/client";

export interface PositionPagination {
  count: number;
  next: string | null;
  previous: string | null;
  results: (Omit<Position, 'createdAt' | 'updatedAt'>)[] | []
}
