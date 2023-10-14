// user3의 활력징후신호(심박수, 호흡수, 체온) 그래프

import React from "react";
import { useEffect, useState } from "react";
import "./styles.css";
import WebSocket, {WebSocketServer} from "ws";
import ApexChart from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
import { FaHome, FaChild, FaHeartbeat, FaWind, FaTemperatureHigh } from 'react-icons/fa';
import { Link, Navigate } from "react-router-dom";

const Detail = () => {
  const [message, setMessage] = useState(''); // 실시간 데이터를 받아오기 위해 WebSocket에서 message를 받아오며, 온도, 심박수, 호흡수 데이터를 분석하여 message 상태 값을 업데이트
  const [hr, setHr] = useState([]) // 실시간 심박수 데이터를 받아와서 setHr()을 통해 업데이트
  const [rp, setRp] = useState([]) // 실시간 호흡수 데이터를 받아와서 setRp()을 통해 업데이트
  const [tp, setTp] = useState([]) // 실시간 체온 데이터를 받아와서 setTp()을 통해 업데이트
  const [categories, setCategories] = useState([]) // X축 범위를 업데이트 하기위해 state categories 사용

  useEffect(() => {
    setInterval(() => {
      const time = new Date(new Date().getTime());
      const timeStr = `${time.getMinutes().toString().padStart(2, '0')}:${time.getSeconds().toString().padStart(2, '0')}`;
      // 지금 시간을 불러와서 Minutes와 Seconds를 추출하여 2자리씩 맞춘 후 timeStr에 담아서 setCategories를 통해 업데이트
      // 몇분:몇초

      setCategories(prev => ([...prev, timeStr]))
    }, 1000)

    const WebSocket = require('ws');
    const socket = new window.WebSocket('ws://localhost:8080');
    // WebSocket 모듈로 socket 생성 
    // 서버 : 8080번으로 웹소켓을 열어둠, ws://localhost:8080 주소로 연결

    
    socket.onmessage = (event) => {
      setMessage(event.data); // WebSocket으로부터 event.data를 받아와서 message 상태 값 업데이트
      const arr1 = event.data.split(",") // event.data에서 쉼표로 구분된 데이터 분리
      const timestamp = arr1[0]      
      const did = arr1[1] // 센서로부터 온 데이터 메시지에서 did 값 추출
      const batteryLv = arr1[2] // 센서로부터 온 데이터 메시지에서 batteryLv 값 추출
      const hr = arr1[3] // 센서로부터 온 데이터 메시지에서 hr 값 추출
      const tp = arr1[4] // 센서로부터 온 데이터 메시지에서 tp 값 추출
      const rp = arr1[5] // 센서로부터 온 데이터 메시지에서 rp 값 추출
      console.log('did: '+did)
      console.log('hr: '+hr)
      console.log('rp: '+rp)
      console.log('tp: '+tp)

      // 실제 디바이스에서 user3의 device id가 3으로 고정되어 있음, 만일 바뀔시에 바꿔주어야 함
      if (did === '3'){
        setHr(prev => ([...prev, hr])) // setHr()을 사용하여 hr 값의 배열을 실시간으로 업데이트
        setRp(prev => ([...prev, rp])) // setRp()을 사용하여 rp 값의 배열을 실시간으로 업데이트
        setTp(prev => ([...prev, tp])) // setTp()을 사용하여 tp 값의 배열을 실시간으로 업데이트
      }
    };

    return () => {
      if(socket.readyState===1){
        socket.close(); // 연결이 종료되면 socket을 닫아줌
      }
    };
  }, []); // []를 사용하여 한번만 실행되도록 함

  useEffect(() => {
      console.log("hr :" + hr)
      ApexCharts.exec('realtime', 'updateSeries', [{
      data: hr
    }])
  }, [hr]); // 종속성 배열에 hr을 넣어주며, hr state가 업데이트 될 때마다 실행
  useEffect(() => {
      console.log("rp :" + rp)
      ApexCharts.exec('realtime', 'updateSeries', [{
      data: rp
    }])
  }, [rp]); // 종속성 배열에 rp을 넣어주며, rp state가 업데이트 될 때마다 실행
  useEffect(() => {
      console.log("tp :" + tp)
      ApexCharts.exec('realtime', 'updateSeries', [{
      data: tp
      }])
  }, [tp]); // 종속성 배열에 tp을 넣어주며, tp state가 업데이트 될 때마다 실행

  // 심박수 ApexChart로 그리기 속성
  const option1 = {
    chart: {
      id: 'realtime',
      height: 350,
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    colors: ['#FF9999'],
    dataLabels: {
      enabled: true
    },
    stroke: {
      curve: 'smooth'
    },
    // title: {
    //   text: 'Heart Rate',
    //   align: 'left'
    // },
    markers: {
      size: 0
    },
    xaxis: {
      type: 'category',
      range: 10,
      categories: categories
    },
    legend: {
      show: false
    }
  }

  // 호흡수 ApexChart로 그리기 속성
  const option2 = {
    chart: {
      id: 'realtime',
      height: 350,
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    colors: ['#9ACD32'],
    dataLabels: {
      enabled: true
    },
    stroke: {
      curve: 'smooth'
    },
    // title: {
    //   text: 'Respiration Rate',
    //   align: 'left'
    // },
    markers: {
      size: 0
    },
    xaxis: {
      type: 'category',
      range: 10,
      categories: categories
    },
    legend: {
      show: false
    }
  }

  // 체온 ApexChart로 그리기 속성
  const option3 = {
    chart: {
      id: 'realtime',
      height: 350,
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    colors: ['#66B2FF'],
    dataLabels: {
      enabled: true
    },
    stroke: {
      curve: 'smooth'
    },
    // title: {
    //   text: 'Body Temperature',
    //   align: 'left'
    // },
    markers: {
      size: 0
    },
    xaxis: {
      type: 'category',
      range: 10,
      categories: categories
    },
    legend: {
      show: false
    }
  }

  return (
    <div className="detail">
      <p>{message}</p>
      <h3 className="back">
        <Link to={"/Home2"}>
          <FaHome />HOME
        </Link>
      </h3>
      <div id="parent">
        <div id="title1">
        <p id="title11"><FaHeartbeat /> Heart Rate</p>
        <ReactApexChart options={option1} series={[{data:hr}]} type="line" width={"100%"} height={350}/>
        </div>
        <div id="title2">
        <p id="title12"><FaWind /> Respiration Rate</p>
        <ReactApexChart options={option2} series={[{data:rp}]} type="line" width={"100%"} height={350}/>
        </div>
        <div id="title3">
        <p id="title13"><FaTemperatureHigh /> Body Temperature</p>
        <ReactApexChart options={option3} series={[{data:tp}]} type="line" width={"100%"} height={350}/>
        </div>
      </div>
    </div>
  );
}

export default Detail;