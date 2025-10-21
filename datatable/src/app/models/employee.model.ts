import { Employee } from "@prisma/client";

export type EmployeeType = (Omit<Employee, 'createdAt' | 'updatedAt'> & { department: string } & { position: string });
