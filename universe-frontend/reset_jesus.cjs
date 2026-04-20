const mysql = require('mysql2/promise');

async function main() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootuser',
    database: 'universe_app'
  });

  try {
    const [users] = await connection.execute('SELECT id FROM users WHERE name = ?', ['Jesus']);
    if (users.length === 0) {
      console.log('User Jesus not found');
      return;
    }

    for (const user of users) {
      const userId = user.id;
      console.log(`Found Jesus with ID ${userId}. Resetting quests...`);
      
      await connection.execute('DELETE FROM user_task_progress WHERE user_id = ?', [userId]);
      await connection.execute('DELETE FROM user_skill_progress WHERE user_id = ?', [userId]);
      console.log(`Successfully reset active quests for Jesus (ID: ${userId}).`);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await connection.end();
  }
}

main();
