const express = require('express');
const sequelize = require('./configs/db');
const db = require('./models');
const userRoutes = require('./routes/user.route');
const app = express();

app.use(express.json());
app.get('/', (req, res) => res.send('API aktif!'));

// tambahkan routing kamu dibawah sini
app.use('/api/users', userRoutes);

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
app.listen(3003, () => {
  console.log('🚀 Server jalan di http://localhost:3003');
});




