const express = require("express");
const fs = require("fs");
const path = require("path");
const { stringify } = require("querystring");
const bodyparser = require("body-parser");

app = express();
const port = 3000;

const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/loginupgrad');
}
const loginSchema = new mongoose.Schema({
  visitername: String,
  visitercourse: String,
  visiterprogram: String,
  visiteremail: String,
  visiternumber: String
});
const login = mongoose.model('login', loginSchema);


// express scrapp
app.use('/static', express.static('static'));
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'template'))
app.use(express.urlencoded())


app.get('/', (req, res) => {
  res.status(200).render('index.pug');
})
app.post('/', (req, res) => {
  let inputfromuser = req.body;
  // let stringifyinput = JSON.stringify(inputfromuser)
  // fs.writeFileSync('userinput.txt',stringifyinput)
  console.log(inputfromuser)

  var mydata = new login(req.body);
  // var mydata2 = new login(stringifyinput);
  // mydata.save()
  mydata.save().then(() => {
    //   res.send("this data have been save in my document")
    res.status(200).render('index.pug');
    console.log('data saved')
  }).catch(() => {
    res.status(400).send("itemm is not saved");
  });
})  
app.listen(port, () => {
  console.log(`the webpage is running succsesfully on:${port}`)
})
