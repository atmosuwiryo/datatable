import axios from 'axios';

describe('Employee (e2e)', () => {
  const baseURL = 'http://localhost:3000/api';
  let createdEmployeeId: string;
  let createdDepartmentId: string;
  let createdPositionId: string;

  const employeeName = 'Employee Test';
  const departmentName = 'Department Test';
  const positionName = 'Position Test';

  beforeAll(async () => {
    const response = await axios.post(`${baseURL}/departments`, {
      name: departmentName,
    });

    createdDepartmentId = response.data.id;

    const positionResponse = await axios.post(`${baseURL}/positions`, {
      name: positionName,
    });

    createdPositionId = positionResponse.data.id;
  });

  afterAll(async () => {
    await axios.delete(`${baseURL}/positions/${createdPositionId}`);
    await axios.delete(`${baseURL}/departments/${createdDepartmentId}`);
  });

  it('POST /employees should create an employee', async () => {
    const response = await axios.post(`${baseURL}/employees`, {
      name: employeeName,
      departmentId: createdDepartmentId,
      positionId: createdPositionId,
      dateOfHire: '2022-01-01',
    });

    expect(response.status).toBe(201);
    expect(response.data.name).toBe(employeeName);

    createdEmployeeId = response.data.id;
  });

  it('GET /employees should retrieve a list of employees', async () => {
    const response = await axios.get(`${baseURL}/employees`);

    expect(response.status).toBe(200);
    expect(response.data.results.length).toBeGreaterThan(0);
  });

  it('GET /employees/:id should retrieve an employee by ID', async () => {
    const response = await axios.get(`${baseURL}/employees/${createdEmployeeId}`);

    expect(response.status).toBe(200);
    expect(response.data.name).toBe(employeeName);
  });

  it('PATCH /employees/:id should update an employee by ID', async () => {
    const response = await axios.patch(`${baseURL}/employees/${createdEmployeeId}`, {
      name: employeeName + ' Updated',
    });

    expect(response.status).toBe(200);
    expect(response.data.name).toBe(employeeName + ' Updated');
  });

  it('DELETE /employees/:id should delete an employee by ID', async () => {
    const response = await axios.delete(`${baseURL}/employees/${createdEmployeeId}`);

    expect(response.status).toBe(200);
  });
});
