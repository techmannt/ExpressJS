const express = require('express');
const path = require('path');
const fs = require('fs');

let app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.post('/formsubmissions', (req, res, next) => {
  res.send(`Thank you, ${req.body.name}!`);

  let userObject = { name: req.body.name, email: req.body.email };
  fs.appendFileSync(path.join(__dirname, 'contact-form.json'), JSON.stringify(userObject));

  next();
});

app.use((req, res, next) => {
  console.log(`Your URL was: ${req.originalUrl}`);
  next();
});

app.use('/formsubmissions', (req, res) => {
  let fileData = fs.readFileSync(path.join(__dirname, 'contact-form.json'), {encoding: "UTF-8"});
  console.log(JSON.parse(fileData));

});


// Commented out for the ADVANCE portion of the lab:
// app.get('/', (req, res) => {
//   res.send('Hello from the web server side...');
// });

app.listen(3000);
