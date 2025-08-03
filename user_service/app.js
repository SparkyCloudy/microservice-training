const express = require('express');
const app = express();

require('./configs').init();
require('./models');

const userRoutes = require('./routes/user.route');
const eventRoutes = require('./routes/event.route');

app.use(express.json());
app.get('/', (req, res) => res.send('API aktif!'));

// tambahkan routing kamu dibawah sini
app.use(eventRoutes);
app.use('/api/users', userRoutes);

// Jalankan server after database initialization
app.listen(3003, () => {
  console.log('🚀 Server jalan di http://localhost:3003');
});
