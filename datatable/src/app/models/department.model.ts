import { Department } from "@prisma/client";

export type DepartmentType = (Omit<Department, 'createdAt' | 'updatedAt'>);
