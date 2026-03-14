const fs = require('fs');

try {
  const content = fs.readFileSync('d:\\Users\\chettana_s\\Desktop\\New folder (2)\\New folder\\workload-monitor\\src\\lib\\mockData.ts', 'utf8');

  // Extract users
  const usersStart = content.indexOf('export const mockUsers: User[] = [') + 33;
  const usersEnd = content.indexOf('export const mockProjects: Project[] =') - 1;
  const usersStr = content.substring(usersStart, usersEnd).trim().replace(/;$/, '');
  const users = eval('(' + usersStr + ')');

  // Extract tasks
  const tasksStart = content.indexOf('export const mockTasks: Task[] = [') + 33;
  const tasksStr = content.substring(tasksStart).trim().replace(/;$/, '');
  const tasks = eval('(' + tasksStr + ')');

  console.log(`Total users: ${users.length}, Total tasks: ${tasks.length}`);

  const targetDateStr = '2026-03-13';
  const targetDateObj = new Date(targetDateStr + 'T00:00:00');

  for (const user of users) {
    const userTasks = tasks.filter(t => t.userId === user.id);
    let dayLoadTasks = 0;
    userTasks.forEach(task => {
      const tStart = new Date(task.startDate + 'T00:00:00');
      const tEnd = new Date(task.endDate + 'T23:59:59');
      if (targetDateObj >= tStart && targetDateObj <= tEnd) {
        dayLoadTasks += 1;
      }
    });
    if (dayLoadTasks > 0) {
      console.log(`${user.id} (${user.department}): ${dayLoadTasks} tasks on ${targetDateStr}`);
    }
  }

} catch (e) {
  console.error("Error evaluating mockData.ts: ", e.message);
}
