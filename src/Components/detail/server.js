// 2가지 서버
// 1. 웹소켓으로 센서 데이터값 받아오기
const express = require("express");
const mysql = require("mysql");
const WebSocket = require("ws");
const cors = require('cors');

// Express 앱 생성
const app = express();
const wss = new WebSocket.Server({ port: 8080 });

let data = "";

// WebSocket 서버 연결 처리
wss.on("connection", (ws) => {
  console.log("socket open");
  ws.on("message", (message) => {
    //const msg = isBinary ? data : data.toString();
    const msg = message;
    console.log(msg + "\n\n");
    console.log("receive from client: ", msg);
    ws.send("send to client: echo " + msg);

    data = msg; // 데이터 저장 및 브로드캐스트 처리
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  // WebSocket 연결 종료 처리
  ws.on("close", () => {
    console.log("disconnected");
  });
});

// MySQL 데이터베이스 연결 설정
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12341234",
  database: "oceanlab",
});

// MySQL 데이터베이스에 연결을 시도
connection.connect((err) => {
  if (err) {
    console.error("Failed to connect to MySQL database", err);
    // 여기서 res 객체를 사용할 수 없음
  } else {
    connection.query("DROP TABLE if exists user");
    connection.query(
      "CREATE TABLE user(did VARCHAR(45), uid VARCHAR(45), name VARCHAR(45))"
    );
    console.log("Connected to the MySQL database");

    // Express 앱을 포트 3000에서 시작
    app.listen(3333, () => {
      console.log("Server is running on port 3333");
    });
  }
});

// 2. Section0에서 입력한 해경 정보를 mysql db에 저장하기 위해 연결
// Express 미들웨어 설정
app.use(cors());
app.use(express.json()); // POST 요청 시 값을 객체로 바꿔줌
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static("public"));

// POST 요청 처리
app.post("/data", (req, res) => {
  const { did, uid, name } = req.body;

  const values = did.map((_, index) => [did[index], uid[index], name[index]]);
  const query = "INSERT INTO user (did, uid, name) VALUES ?";

  // 요청이 들어올 때 데이터베이스에 추가
  connection.query(query, [values], (err, result) => {
    if (err) {
      console.error("Error saving data to MySQL database", err);
      res.status(500).json({ error: "Failed to save data to database" });
    } else {
      console.log("Data saved to MySQL database");
      res.status(200).json({ success: true });
    }
  });
});
