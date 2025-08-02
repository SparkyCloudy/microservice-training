const express = require('express');
const eventRouter = require('./routes/event.route');

const app = express();

app.use(express.json());
app.use(eventRouter);

app.listen(3000, () => {
  console.log('Listening on 3000');
});