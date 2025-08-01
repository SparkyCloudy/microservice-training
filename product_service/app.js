const express = require('express');
const sequelize = require('./configs/db');
const db = require('./models');
const app = express();
const productRoutes = require('./routes/product.route');

app.use(express.json());
app.get('/', (req, res) => res.send('API aktif!'));

// tambahkan routing kamu dibawah sini
app.use('/api/products', productRoutes);

// Koneksi ke database
sequelize.authenticate()
  .then(() => {
    console.log('✅ Terkoneksi ke MySQL');
    return db.sequelize.sync({alter: true});
  })
  .then(() => {
    console.log('✅ Sinkronisasi selesai');
  })
  .catch((err) => {
    console.error('❌ Gagal konek:', err);
  });


// Jalankan server
app.listen(3001, () => {
  console.log('🚀 Server jalan di http://localhost:3001');
});




