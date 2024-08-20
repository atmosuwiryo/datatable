import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { departments } from './seeder/department';
import { employees } from './seeder/employee';
import { positions } from './seeder/position';

async function main() {

  const departmentRecords = await Promise.all(departments.map(dep => prisma.department.create({ data: dep })));
  const positionRecords = await Promise.all(positions.map(pos => prisma.position.create({ data: pos })));


  for (const employee of employees) {
    const department = departmentRecords.find(dep => dep.name === employee.department);
    const position = positionRecords.find(pos => pos.name === employee.position);
    await prisma.employee.create({
      data: {
        name: employee.name,
        departmentId: department.id,
        positionId: position.id,
        dateOfHire: employee.dateOfHire
      }
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
