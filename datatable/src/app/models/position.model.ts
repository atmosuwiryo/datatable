import { Position } from "@prisma/client";

export type PositionType = (Omit<Position, 'createdAt' | 'updatedAt'>);
