import axios from 'axios';

describe('Department (e2e)', () => {
  const baseURL = 'http://localhost:3000/api';
  let createdDepartmentId: string;
  const departmentName = 'Department Test';

  it('POST /departments should create a department', async () => {
    const response = await axios.post(`${baseURL}/departments`, {
      name: departmentName,
    });

    expect(response.status).toBe(201);
    expect(response.data.name).toBe(departmentName);

    createdDepartmentId = response.data.id;
  });

  it('GET /departments should retrieve a list of departments', async () => {
    const response = await axios.get(`${baseURL}/departments`);

    expect(response.status).toBe(200);
    expect(response.data.results.length).toBeGreaterThan(0);
  });

  it('GET /departments/:id should retrieve a department by ID', async () => {
    const response = await axios.get(`${baseURL}/departments/${createdDepartmentId}`);

    expect(response.status).toBe(200);
    expect(response.data.name).toBe(departmentName);
  });

  it('PATCH /departments/:id should update a department by ID', async () => {
    const response = await axios.patch(`${baseURL}/departments/${createdDepartmentId}`, {
      name: departmentName + ' Updated',
    });

    expect(response.status).toBe(200);
    expect(response.data.name).toBe(departmentName + ' Updated');
  });

  it('DELETE /departments/:id should delete a department by ID', async () => {
    const response = await axios.delete(`${baseURL}/departments/${createdDepartmentId}`);

    expect(response.status).toBe(200);
  });
});
