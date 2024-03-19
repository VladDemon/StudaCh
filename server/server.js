import cors from 'cors'
import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'
import fs from 'fs'
import http from 'http'
import expressSession, { Session } from 'express-session';
import CryptoJS from 'crypto-js'
import { nanoid } from 'nanoid'

import { Server } from 'socket.io';
const __dirname = path.resolve()
const app = express();
const PORT = process.env.PORT  || 3001;

app.use(express.json());
app.use(cors());
app.use(bodyParser());
app.use(express.static(path.join('public')));
const secretKey = CryptoJS.lib.WordArray.random(64).toString(CryptoJS.enc.Hex);

const genuId = ()=>{
  return nanoid(6);
}


app.use(expressSession({
  name: 'cookSession',
  secret: secretKey,
  resave: false,
  saveUninitialized: false,
}))


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


io.on('connection', (socket) => {
  socket.emit('init', MsgJSON.messages);

  socket.on('message', (msg) => {
    console.log(msg)
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
  dataBase.push(newData);
  fs.writeFileSync(dataFilePath, JSON.stringify(dataBase, null, 2));
  res.json({ success: true, message: 'Data added successfully' });
});



app.post('/app/login', (req, res) => {
  const {user, pass} = req.body;
  console.log('Request Body:', req.body);
  const LogSucces = dataBase.find((item) => {return item.user === user && item.pass === pass})
  if(!LogSucces){
    res.json({success: false})
  } else{
    // const sessionID = genuId();
    // req.session.user = user;
    // здесь создание сессии
    res.json({success: true, user: user, pass: pass})
  }
})

// Здесь аутентификация на сессии
// app.post('/app/authenticated', (req, res) => {
//   console.log(111)
//   // const sessionId = req.session.id;
//   // const userSessionId = req.getSessionId;
//   const sessionId = req.sessionID;
//   const userSessionId = req.body.getSessionId;
//   console.log(req.body);
//   console.log(req.session.user, sessionId, userSessionId)
//   if (req.session.user) {
//       res.json({ authenticated: true, user: req.session.user });
//       console.log(req.session.user)
//   } else {
//       res.json({ authenticated: false });
//   }
// });

app.get("/app/userList", (req,res) => {
  res.json(dataBase.map(us => {return us.user}))
})


app.post('/app/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.sendStatus(500);
    } else {
      res.clearCookie('cookSession');
      res.json({ success: true, message: 'Logout successful' });
    }
  });
});



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

