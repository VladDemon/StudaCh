import cors from 'cors'
import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import http from 'http'



import { createServer } from 'http'
import { Server } from 'socket.io';

const __dirname = path.resolve()
const app = express();
const PORT = process.env.PORT  || 3001;
const SECRET_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwOTM1MTc1MywiaWF0IjoxNzA5MzUxNzUzfQ.bUCXs0Aw1xdhS8jrj2h54qZMJJByKsWX4R0o-krez4A"

app.use(express.json());
app.use(cors());
app.use(bodyParser());
app.use(express.static(path.join('public')));

let dataFilePath = path.join(__dirname, "dataBase", "users.json")
let dataBase = JSON.parse(fs.readFileSync(dataFilePath));

let dataMsgPath = path.join(__dirname, "dataBase", "messages.json")
let MsgJSON = JSON.parse(fs.readFileSync(dataMsgPath));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

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





io.on('connection', (socket) => {
  socket.emit('init', MsgJSON.messages);

  socket.on('message', (msg) => {
    const message = JSON.parse(msg);
    io.emit('res', message);
    MsgJSON.messages.push(message);
    fs.writeFile(dataMsgPath, JSON.stringify(MsgJSON, null, 2), (err) => {
      if(err) return;
    })
  })
  socket.on('disconnect', () => {
  });
})

app.use('/socket.io', (req, res, next) => {
  res.status(404).end();
});


app.post('/app/register', async(req,res) =>{
  let newData = { user: req.body.user, pass: req.body.pass };
  if(!dataBase.find((item) => {return item.user === req.body.user})){
    dataBase.push(newData);
    fs.writeFileSync(dataFilePath, JSON.stringify(dataBase, null, 2));
    res.json({ success: true, message: 'Data added successfully' });
    console.log("true")
  }
  res.json({ success: false, message: 'User already exists' });
  console.log("exist")

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

  }
})



app.get('/app/profile', (req,res) => {
  res.json({
    message: "HelloFromBackEnd",
    user: req.user
  })
})

const start = () =>{
  try{
    server.listen(PORT, () =>{
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
