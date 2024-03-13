import cors from 'cors'
import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'
import fs from 'fs'
import jwt from 'jsonwebtoken'


const __dirname = path.resolve()
const app = express();
const PORT = process.env.PORT  || 3001;
const SECRET_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwOTM1MTc1MywiaWF0IjoxNzA5MzUxNzUzfQ.bUCXs0Aw1xdhS8jrj2h54qZMJJByKsWX4R0o-krez4A"

app.use(express.json());
app.use(cors());
app.use(bodyParser());

let dataFilePath = path.join(__dirname, "dataBase", "users.json")
let dataBase = JSON.parse(fs.readFileSync(dataFilePath));

const generateToken = (user) => {
  return jwt.sign({ user }, SECRET_TOKEN, { expiresIn: '1h' });
};

const authToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};



app.post('/app/register', async(req,res) =>{
  let newData = { user: req.body.user, pass: req.body.pass };
  dataBase.push(newData);
  fs.writeFileSync(dataFilePath, JSON.stringify(dataBase, null, 2));
  res.json({ success: true, message: 'Data added successfully' });
});

app.post('/app/login', (req, res) => {
  const {user, pass} = req.body;
  console.log('Request Body:', req.body);
  const LogSucces = dataBase.find((item) => {return item.user === user && item.pass === pass})
  console.log(LogSucces)
  if(!LogSucces){
    res.json({success: false})
  } else{
    const token = generateToken(user);
    res.json({success: true, user: user, pass: pass, token})
    // const token = jwt.sign({ user }, SECRET, { expiresIn: '1h' });
    // res.json({success: true, user: user, pass: pass, token})
  }
})

// const authToken = (req, res, next) =>{
//   const Token = req.header('Authorization')

//   if(!Token) return res.sendStatun(401)
//   // jwt.verify(token, SECRET, (err, user) => {
//     if(err) return res.sendStatun(403);
//     req.user = user;
//     next();
//   })
// }
app.get('/app/profile', (req,res) => {
  res.json({
    message: "HelloFromBackEnd",
    user: req.user
  })
})  

const start = () =>{
  try{
    app.listen(PORT, () =>{
      console.log(`Server Starte on PORT ${PORT}`);
    })
  }
  catch(e){
    console.log(e);
  }
}

start()
app.get('/app/profile', (req, res)=> {
  res.json({
    message: "HelloFromBackEnd",
  })
});
