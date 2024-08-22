import axios from 'axios';

describe('Position (e2e)', () => {
  const baseURL = 'http://localhost:3000/api';
  let createdPositionId: string;
  const positionName = 'Position Test';

  it('POST /positions should create a position', async () => {
    const response = await axios.post(`${baseURL}/positions`, {
      name: positionName,
    });

    expect(response.status).toBe(201);
    expect(response.data.name).toBe(positionName);

    createdPositionId = response.data.id;
  });

  it('GET /positions should retrieve a list of positions', async () => {
    const response = await axios.get(`${baseURL}/positions`);

    expect(response.status).toBe(200);
    expect(response.data.results.length).toBeGreaterThan(0);
  });

  it('GET /positions/:id should retrieve a position by ID', async () => {
    const response = await axios.get(`${baseURL}/positions/${createdPositionId}`);

    expect(response.status).toBe(200);
    expect(response.data.name).toBe(positionName);
  });

  it('PATCH /positions/:id should update a position by ID', async () => {
    const response = await axios.patch(`${baseURL}/positions/${createdPositionId}`, {
      name: positionName + ' Updated',
    });

    expect(response.status).toBe(200);
    expect(response.data.name).toBe(positionName + ' Updated');
  });

  it('DELETE /positions/:id should delete a position by ID', async () => {
    const response = await axios.delete(`${baseURL}/positions/${createdPositionId}`);

    expect(response.status).toBe(200);
  });
});
