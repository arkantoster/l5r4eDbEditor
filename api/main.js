var express = require('express');
var app = express();
const port = 3010;
var fs = require('fs');

app.get('/resp', (req, res)=>{
  res.send({obj:123});
})

app.get('/loadFile', (req, res) => {
  try {
    const bdJSON = fs.readFileSync('./base.json');
    res.send(JSON.parse(bdJSON));
  } catch (error) {
    console.error(error)
  }
});

app.get('/loadFileJSON', (req, res) => {
  try {
    const bdJSON = fs.readFileSync('./base.json');
    res.send(bdJSON);
  } catch (error) {
    console.error(error)
  }
});

app.post('/saveFile', (req, res) => {
  console.log(req.body);
  res.set(200).send();
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
