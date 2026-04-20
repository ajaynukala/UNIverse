const axios = require('axios');

async function test() {
  try {
    const api = axios.create({ baseURL: 'http://localhost:8080/api' });
    
    // Register
    console.log('Registering user...');
    const regRes = await api.post('/auth/register', { name: "TestUser", email: `test${Date.now()}@test.com`, password: "password" });
    const user = regRes.data.user;
    const token = regRes.data.token;
    console.log(`Registered user ${user.id}`);
    
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    // Start skill (assume skill ID 1 exists)
    console.log('Starting skill 1...');
    await api.post(`/progress/user/${user.id}/skill/1/start`);
    
    // Fetch tasks for skill
    console.log('Fetching tasks...');
    const tasksRes = await api.get(`/skills/1/tasks`);
    const tasks = tasksRes.data;
    const firstTaskId = tasks[0].id;
    
    // Complete task
    console.log(`Completing task ${firstTaskId}...`);
    const completeRes = await api.post(`/progress/user/${user.id}/task/${firstTaskId}/complete`);
    console.log('Task completed successfully:', completeRes.data);
    
  } catch (err) {
    console.error('Error:', err.response ? err.response.data : err.message);
  }
}
test();
