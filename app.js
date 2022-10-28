const express = require('express');
const fs = require('fs')
const app = express();
const port = 3000;
app.use(express.static('logs'));

var bodyParser = require('body-parser');

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/:filename', (req, res) => {
  let filename = req.params.filename;
  const file = `${__dirname}/logs/${filename}`;
  try {
    if (fs.existsSync(path)) {
      res.sendFile(file);
    }
  } catch(err) {
    res.send("File not exists");
  }
})

app.post('/addlog', (req, res) => {
  try {
    const file = `${__dirname}/logs/${getCurrentDate()}.txt`;
    if (fs.existsSync(file)) {
      fs.appendFileSync(file,  req.body.message + '\n');
    }
    else {
      fs.writeFileSync(file, req.body.message + '\n');
    }
    res.status(201).send("Successful")
  } catch(err) {
    res.send(err);
  }
})

function getCurrentDate(){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + '-' + mm + '-' + yyyy;
  return today;
}

app.listen(port, () => {
  console.log(`Twarit log listening on port ${port}`)
})
