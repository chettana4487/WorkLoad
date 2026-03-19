const targetDate = new Date('2026-03-16T12:00:00');
fetch('http://localhost:3000/api/data')
  .then(res => res.json())
  .then(data => {
    const tasks = data.tasks.filter(t => t.department === 'Design' || data.users.find(u => u.id === t.userId)?.department === 'Design');
    const activeTasks = tasks.filter(t => new Date(t.startDate + 'T00:00:00') <= targetDate && new Date(t.endDate + 'T23:59:59') >= targetDate);
    console.log(JSON.stringify(activeTasks.map(t => ({title: t.title, user: data.users.find(u => u.id === t.userId)?.name})), null, 2));
    process.exit(0);
  });
