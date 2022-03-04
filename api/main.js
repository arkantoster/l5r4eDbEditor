var express = require('express');
const bodyParser = require('body-parser');
var app = express();
var cors = require('cors')
const port = 3010;
var fs = require('fs');
const DBPATH='./base.json';

app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


app.get('/loadFile', (req, res) => {
  try {
    const bdJSON = fs.readFileSync(DBPATH);
    res.send(JSON.parse(bdJSON));
  } catch (error) {
    console.error(error);
    res.set(404).send(error);
  }
});

app.post('/saveFile', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const {body}=req;
    const bdJSON = fs.readFileSync(DBPATH);
    let jData = JSON.parse(bdJSON);
    jData[body.chosen][body.idx]=body.data;
    fs.writeFile(DBPATH, JSON.stringify(jData), function(err){
      if (err){
        console.log(err);
        res.set(404).send(error);
      }else{
        res.set(200).send(jData);
      }
    });
  } catch (error) {
    console.error(error);
    res.set(404).send(error);
  }
})

app.post('/profile', function (req, res, next) {
  console.log(req.body)
  res.json(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
