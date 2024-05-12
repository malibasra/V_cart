const express=require('express');
const mysql=require('mysql');
const cors=require('cors');
const bodyparser=require('body-parser');
const multer=require('multer');
const path=require('path');
const fs = require('fs');
const app=express();


app.use(express.json());
app.use(cors());
app.use(express.static('public'));
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "register"
})
app.post('/login', (req, res) => {
  const { username, email, password } = req.body;
  const sql = "SELECT * FROM logininfo WHERE Username = ? AND Email = ? AND Password = ?";
  
  db.query(sql, [username, email, password], (err, data) => {
      if (err) return res.json("Error");

      if (data.length > 0) {
          if (username === "ADMIN" && email === "admin.123@gmail.com" && password === "admin_123") {
              return res.json("Admin Successfully");
          } else {
              return res.json("Login Successfully");
          }
      } else {
          return res.json("No Record");
      }
  });
});

app.post('/register', (req, res) => {
    const {username, email, contact, address, shopname, password} = req.body;
    //console.log(username, email, contact, address, shopname, password);
  
    const sql = 'INSERT INTO logininfo (Username,Email,Contactnumber,Address,Shopname,Password) VALUES(?,?,?,?,?,?)';

    const values=[username, email, contact, address, shopname, password];
    db.query(sql, values, (err, results) => {
      if (err) {
        console.log('Error inserting data: ' + err);
        res.status(204).json({message:'Error inserting data'});
        return;
      }
      else{
        res.status(201).json({message:'Data inserted successfully'});
      }
    });
  });
  const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'image'
  });
  con.connect((err)=>{
    if(err){
      console.log('Error connecting to Mysql ',err);
      return;
    }
    console.log('Connectect to Mysql database');
  });
  app.get('/main',(req,res)=>{
    const sql="SELECT * FROM picture";
    con.query(sql,(err,results)=>{
      if(err){
        console.log('Error fecting image from database ',err);
        return res.status(500).json({error:'Error fetching images '});
        //return res.json("error");
      }
      return res.json(results);
    });
  });

  //for upload images
  const storage=multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = 'public/images'; // Destination directory
      // Create the directory if it doesn't exist
      if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename:(req,file,cb)=>{
      cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
  })
  const upload=multer({
    storage:storage
  })
  app.post('/product',upload.single('image'),(req,res)=>{
    const image=req.file.filename;
    const {productname,price} = req.body;
    //console.log(img);
    //console.log(image);
    //console.log(productname);
    //console.log(price);
    const sql='INSERT INTO picture (Name,Price,Img) VALUES (?, ?, ?)';
    const values=[productname,price,image];
    con.query(sql, values, (err, results) => {
      if (err) return res.json({Message :"Error"});
      return res.json({Status:"Success"});
    });

  })

  //For update the product
  app.post('/updateproduct',upload.single('image'),(req,res)=>{
    const image=req.file.filename;
    const {productname,price,updatename}=req.body;
    const values=[productname,price,image,updatename]
    const sql="UPDATE picture SET Name = ?, Price=?, Img=? WHERE Name=?";
    con.query(sql,values,(err,results)=>{
      if(err) return res.json("Error");
      return res.json("Success");
    });
    
  })

app.listen(8081, () => {
    console.log("Listening...."); 
})