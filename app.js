const fs = require('fs');
const path = require('path');

const express = require('express');
const multer = require("multer");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "");

app.use('/contents', express.static(path.join(__dirname, 'contents')));

app.get("/", (req, res, next) =>{

    fs.readdir("contents/", (err, files) => {
        // console.log(files);
        res.render('index', {
            files: files
        });
    });
})

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'contents/')
    },
    filename: function (req, file, cb) {
        let date = new Date();
        date = date.toISOString();
        // date = date.splite(".")[0]
        let ogFileName = file.originalname;
        let splited = ogFileName.split(".");
        let extension = splited[splited.length - 1];
        splited.pop();
        let fileNameOnly = splited.join(".");
        // console.log(fileNameOnly);
      cb(null, fileNameOnly + "-" + date + "."+extension)
    }
  })
   
let upload = multer({ storage: storage })

app.post("/", upload.array("files", 12),  (req, res, next) =>{
    // console.log(req.files);
    res.redirect("/?success=true&count="+req.files.length);
})

app.listen(5010);
console.log("Local File Share Running on localhost:5010");

const getIpAddresses = () =>{
  const nets = require('os').networkInterfaces();
  console.log("Looking for Local IP")
  let found = false;
  for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
          // if (net.family === 'IPv4' && !net.internal) {
            if(net.address.startsWith('192.168.')){
              console.log("IP Found " + net.address);
              found = true;
              console.log(`Access "Local File Share" at http://${net.address}:5010`);
            }
          // }
      }
  }
  if(!found){
    console.log("IP not detected.");
    console.log("Verify you are connected to a network.")
    console.log("Please use ipconfig/ifconfig");
  }
}

getIpAddresses()
