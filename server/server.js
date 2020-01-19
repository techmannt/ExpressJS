const express = require('express');
const path = require('path');

let app = express();

app.use((req, res, next) => {
  console.log(`Your URL was: ${req.originalUrl}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello from the web server side...');
});

app.use(express.static(path.join(__dirname, "../public")));

app.listen(3000);
