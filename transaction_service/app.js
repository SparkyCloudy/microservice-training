const express = require('express');
const app = express();

const transactionRoutes = require('./routes/transaction.route');
const eventRoutes = require('./routes/event.route');

require('./configs').init();
require('./models');

app.use(express.json());
app.use(eventRoutes);

app.use('/api/transactions', transactionRoutes);
app.get('/', (req, res) => res.send('API aktif!'));

// Jalankan server
app.listen(3002, () => {
  console.log('🚀 Server jalan di http://localhost:3002');
});
