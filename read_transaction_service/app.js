const express = require('express');
const app = express();

const transactionRoutes = require('./routes/transaction.route');
const eventRoutes = require('./routes/event.route');

require('./configs').init();
require('./models');

app.use(express.json());
app.get('/', (req, res) => res.send('API aktif!'));

// tambahkan routing kamu dibawah sini
app.use(eventRoutes);
app.use('/api/transactions', transactionRoutes);

// Jalankan server
app.listen(30021, () => {
  console.log('🚀 Server jalan di http://localhost:30021');
});




