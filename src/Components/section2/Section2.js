// 좌측 Nav : HOME
// 메인화면(HOME)
// 좌측 : Nav
// 중간 : 3X3 해경 정보 -> 클릭하면 Detail로 Link연결되어 실시간 그래프 보여줌

import icon from 'C:/Users/user/Downloads/hpe-modify/hpe-example-main/my-app/src/Images/icon.png';
import {Link} from "react-router-dom";
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom'
import { FaHome, FaChild, FaHeartbeat, FaWind, FaTemperatureHigh } from 'react-icons/fa';
import fall from './fall.png';
import run from './run.png';
import stand from './stand.png';
import { useLocation } from 'react-router-dom'; // useLocation 사용

const Section2 = () => {
  // 상태 변수 선언
  const [user1, setUser1] = useState({ hr: 0, rp: 0, tp: 0 });
  const [user2, setUser2] = useState({ hr: 0, rp: 0, tp: 0 });
  const [user3, setUser3] = useState({ hr: 0, rp: 0, tp: 0 });
  const [user4, setUser4] = useState({ hr: 0, rp: 0, tp: 0 });
  const [user5, setUser5] = useState({ hr: 0, rp: 0, tp: 0 });
  const [user6, setUser6] = useState({ hr: 0, rp: 0, tp: 0 });
  const [user7, setUser7] = useState({ hr: 0, rp: 0, tp: 0 });
  const [user8, setUser8] = useState({ hr: 0, rp: 0, tp: 0 });
  const [user9, setUser9] = useState({ hr: 0, rp: 0, tp: 0 });

  const location = useLocation(); // 위치 정보 가져오기 및 로케이션 훅 사용
  const userIDs = location.state?.userIDs ?? []; // 사용자 userIDs 값 가져오기 및 기본값 설정

  const [message, setMessage] = useState('');
  const [imageSrc, setImageSrc] = useState(stand);
  const [imageSrc1, setImageSrc1] = useState(stand);
  const [imageSrc2, setImageSrc2] = useState(stand);
  const [imageSrc3, setImageSrc3] = useState(stand);
  const [imageSrc4, setImageSrc4] = useState(stand);
  const [imageSrc5, setImageSrc5] = useState(stand);
  const [imageSrc6, setImageSrc6] = useState(stand);
  const [imageSrc7, setImageSrc7] = useState(stand);
  const [imageSrc8, setImageSrc8] = useState(stand);
  const [imageSrc9, setImageSrc9] = useState(stand);

  // 이미지 변경 함수
    const changeImageSrc=(action)=>{
      // 행위가 -3인 경우 "낙상"이라고 가정
      if(action==='-3'){ //fall
        setImageSrc(fall);
      // 행위가 -2인 경우 "뛰기"라고 가정
      }else if(action==="-2"){ //run
        setImageSrc(run);
      // 그 외인 경우 "서있기"라고 가정
      }else{ //stand
        setImageSrc(stand);
      }
    }

    const changeImageSrc2=(did, action)=>{
      //did 고정이라고 가정(1, 2, 3 ...)
      if (did === '1') {
        // 행위가 -3인 경우 "낙상"이라고 가정
        if (action === '-3') {
          setImageSrc1(fall)
        // 행위가 -2인 경우 "뛰기"라고 가정
        }else if (action === '-2') {
          setImageSrc1(run)
        // 그 외인 경우 "서있기"라고 가정
        }else{
          setImageSrc1(stand)
        }
      }else if (did === '2') {
        if (action === '-3') {
          setImageSrc2(fall)
        }else if (action === '-2') {
          setImageSrc2(run)
        }else{
          setImageSrc2(stand)
        }
      }else if (did === '3') {
        if (action === '-3') {
          setImageSrc3(fall)
        }else if (action === '-2') {
          setImageSrc3(run)
        }else{
          setImageSrc3(stand)
        }
      }else if (did === '4') {
        if (action === '-3') {
          setImageSrc4(fall)
        }else if (action === '-2') {
          setImageSrc4(run)
        }else{
          setImageSrc4(stand)
        }
      }else if (did === '5') {
        if (action === '-3') {
          setImageSrc5(fall)
        }else if (action === '-2') {
          setImageSrc5(run)
        }else{
          setImageSrc5(stand)
        }
      }else if (did === '6') {
        if (action === '-3') {
          setImageSrc6(fall)
        }else if (action === '-2') {
          setImageSrc6(run)
        }else{
          setImageSrc6(stand)
        }
      }else if (did === '7') {
        if (action === '-3') {
          setImageSrc7(fall)
        }else if (action === '-2') {
          setImageSrc7(run)
        }else{
          setImageSrc7(stand)
        }
      }else if (did === '8') {
        if (action === '-3') {
          setImageSrc8(fall)
        }else if (action === '-2') {
          setImageSrc8(run)
        }else{
          setImageSrc8(stand)
        }
      }else if (did === '9') {
        if (action === '-3') {
          setImageSrc9(fall)
        }else if (action === '-2') {
          setImageSrc9(run)
        }else{
          setImageSrc9(stand)
        }
      }
    }


    useEffect(() => {
      // 웹소켓 연결
      const WebSocket = require('ws');
      const socket = new window.WebSocket('ws://localhost:8080');

      // 웹소켓 메시지 처리
      socket.onmessage = (event) => {
        setMessage(event.data);
        const arr1 = event.data.split(",")
        const did = arr1[1]
        const hr = arr1[3]
        const rp = arr1[5]
        const tp = arr1[4]
        const action = arr1[7]
        changeImageSrc(action)

        changeImageSrc2(did, action)

        console.log('did: '+did)
        console.log('hr: '+hr)
        console.log('rp: '+rp)
        console.log('tp: '+tp)

        // 상태 업데이트
        if (did === "1") {
          setUser1({ hr: hr, rp: rp, tp: tp });
        } else if (did === "2") {
          setUser2({ hr: hr, rp: rp, tp: tp });
        } else if (did === "3") {
          setUser3({ hr: hr, rp: rp, tp: tp });
        } else if (did === "4") {
          setUser4({ hr: hr, rp: rp, tp: tp });
        } else if (did === "5") {
          setUser5({ hr: hr, rp: rp, tp: tp });
        } else if (did === "6") {
          setUser6({ hr: hr, rp: rp, tp: tp });
        } else if (did === "7") {
          setUser7({ hr: hr, rp: rp, tp: tp });
        } else if (did === "8") {
          setUser8({ hr: hr, rp: rp, tp: tp });
        } else if (did === "9") {
          setUser9({ hr: hr, rp: rp, tp: tp });
        }          

      };

      // 소켓 연결 종료시 소켓 종료
      return () => {
        if(socket.readyState===1){
          socket.close();
        }
      };
    }, []);
    
    return (
      <div className="section">
      {/* 센서값 전체 찍기, 임의로 확인가능 */}
          {/* <p>{message}</p> */}
          <div className="experience">
              <div>
              <div className="row1">
              <div className="square">
              <Link to={"/Detail1"}>
                  <div id="data" className="click">#1&nbsp;&nbsp;{userIDs[0]}</div>
                  <img id="action" className="pic" src={imageSrc1} height="45px"/>
                  <div id="hr"><FaHeartbeat/> : {user1.hr} </div>
                  <div id="rp"><FaWind/> : {user1.rp} </div>
                  <div id="tp"><FaTemperatureHigh/> : {user1.tp} </div>
              </Link>              
              </div>  
              </div>
              <div className="row1">
              <div className="square">
              <Link to={"/Detail2"}>
                  <div id="data" className="click">#2&nbsp;&nbsp;{userIDs[1]}</div><br/>
                  <img className="pic" src={imageSrc2} height="45px"/>
                  <div id="hr"><FaHeartbeat/> : {user2.hr} </div>
                  <div id="rp"><FaWind/> : {user2.rp} </div>
                  <div id="tp"><FaTemperatureHigh/> : {user2.tp} </div>
                  
              </Link>              
              </div>                 
              </div>
              <div className="row1">
              <div className="square">
              <Link to={"/Detail3"}>
                  <div id="data" className="click">#3&nbsp;&nbsp;{userIDs[2]}</div><br/>
                  <img className="pic" src={imageSrc3} height="45px"/>
                  <div id="hr"><FaHeartbeat/> : {user3.hr} </div>
                  <div id="rp"><FaWind/> : {user3.hr} </div>
                  <div id="tp"><FaTemperatureHigh/> : {user3.hr} </div>
              </Link>              
              </div>                  
              </div>
              </div>
              <div>
              <div className="row2">
              <div className="square">
              <Link to={"/Detail4"}>
                  <div id="data" className="click">#4&nbsp;&nbsp;{userIDs[3]}</div><br/>
                  <img className="pic" src={imageSrc4} height="45px"/>
                  <div id="hr"><FaHeartbeat/> : {user4.hr}</div>
                  <div id="rp"><FaWind/> : {user4.rp}</div>
                  <div id="tp"><FaTemperatureHigh/> : {user4.tp}</div>
              </Link>              
              </div>                 
              </div>
              <div className="row2">
              <div className="square">
              <Link to={"/Detail5"}>
                  <div id="data" className="click">#5&nbsp;&nbsp;{userIDs[4]}</div><br/>
                  <img className="pic" src={imageSrc5} height="45px"/>
                  <div id="hr"><FaHeartbeat/> : {user5.hr}</div>
                  <div id="rp"><FaWind/> : {user5.rp}</div>
                  <div id="tp"><FaTemperatureHigh/> : {user5.tp}</div>
              </Link>              
              </div>           
              </div>
              <div className="row2">
              <div className="square">
              <Link to={"/Detail6"}>
                  <div id="data" className="click">#6&nbsp;&nbsp;{userIDs[5]}</div><br/>
                  <img className="pic" src={imageSrc6} height="45px"/>
                  <div id="hr"><FaHeartbeat/> : {user6.hr}</div>
                  <div id="rp"><FaWind/> : {user6.rp}</div>
                  <div id="tp"><FaTemperatureHigh/> : {user6.tp}</div>
              </Link>              
              </div>               
              </div>
              </div>
              <div>
              <div className="row3">
              <div className="square">
              <Link to={"/Detail7"}>
                  <div id="data" className="click">#7&nbsp;&nbsp;{userIDs[6]}</div><br/>
                  <img className="pic" src={imageSrc7} height="45px"/>
                  <div id="hr"><FaHeartbeat/> : {user7.hr}</div>
                  <div id="rp"><FaWind/> : {user7.rp}</div>
                  <div id="tp"><FaTemperatureHigh/> : {user7.tp}</div>
              </Link>              
              </div>                 
              </div>
              <div className="row3">
              <div className="square">
              <Link to={"/Detail8"}>
                  <div id="data" className="click">#8&nbsp;&nbsp;{userIDs[7]}</div><br/>
                  <img className="pic" src={imageSrc8} height="45px"/>
                  <div id="hr"><FaHeartbeat/> : {user8.hr}</div>
                  <div id="rp"><FaWind/> : {user8.rp}</div>
                  <div id="tp"><FaTemperatureHigh/> : {user8.tp}</div>
              </Link>              
              </div>             
              </div>
              <div className="row3">
              <div className="square">
              <Link to={"/Detail9"}>
                  <div id="data" className="click">#9&nbsp;&nbsp;{userIDs[8]}</div><br/>
                  <img className="pic" src={imageSrc9} height="45px"/>
                  <div id="hr"><FaHeartbeat/> : {user9.hr}</div>
                  <div id="rp"><FaWind/> : {user9.rp}</div>
                  <div id="tp"><FaTemperatureHigh/> : {user9.tp}</div>
              </Link>              
              </div>               
              </div>
              </div>
          </div>
      </div>
    )
}

export default Section2
