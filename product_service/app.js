const express = require('express');
require('./configs').init();
require('./models');

const app = express();
const productRoutes = require('./routes/product.route');
const eventRoutes = require('./routes/event.route');

app.use(express.json());
app.get('/', (req, res) => res.send('API aktif!'));

// tambahkan routing kamu dibawah sini
app.use(eventRoutes);
app.use('/api/products', productRoutes);

// Jalankan server after database initialization
app.listen(3001, () => {
  console.log('🚀 Server jalan di http://localhost:3001');
});
