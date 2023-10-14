// 초기화면
// 등록할 해경 정보(device ID, user ID, user Name)를 등록, mysql db에 저장

import React, { useState, useEffect } from 'react';
import './section0.css';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom'; // React Router의 useHistory 사용

const Section0 = () => {
  const navigate = useNavigate(); // navigate 훅 사용
  const [userIDs, setUserIDs] = useState([]); // 사용자 ID 관리를 위한 상태

  const [infoList, setInfoList] = useState([]); // 정보 리스트를 관리하는 상태
  const [info0, setInfo0] = useState(''); // Device ID를 관리하는 상태
  const [info1, setInfo1] = useState(''); // User ID를 관리하는 상태
  const [info2, setInfo2] = useState(''); // User Name을 관리하는 상태
  const [editIndex, setEditIndex] = useState(-1); // 수정 중인 리스트 인덱스를 관리하는 상태

  // 각 정보의 입력값 변경 처리 함수
  const handleInfo0Change = (e) => setInfo0(e.target.value);
  const handleInfo1Change = (e) => setInfo1(e.target.value);
  const handleInfo2Change = (e) => setInfo2(e.target.value);

  // 정보 저장 처리 함수
  const handleSave = () => {
    if (!info0 || !info1 || !info2) {
      // 정보를 모두 입력하지 않았을 경우
      alert("해당 정보를 모두 입력해주세요");
      return;
    }

    if (editIndex !== -1) {
      // 수정 모드일 때
      const updatedInfoList = [...infoList];
      updatedInfoList[editIndex] = { info0, info1, info2 };
      setInfoList(updatedInfoList);
    } else {
      // 추가 모드일 때
      setInfoList([...infoList, { info0, info1, info2 }]);
    }

    // 입력 상태 초기화
    setInfo0('');
    setInfo1('');
    setInfo2('');
    setEditIndex(-1);
  };

  // 정보 등록 처리 함수
  const handleEnroll = () => {
    const confirmation = window.confirm('등록하시겠습니까?');
    if(confirmation){
      // 데이터 전달을 위한 객체 생성
      const did = infoList.map((info) => info.info0);
      const uid = infoList.map((info) => info.info1);
      setUserIDs(uid);
      const name = infoList.map((info) => info.info2);

      // DB서버에 전송할 데이터
      const data = { did, uid, name };
      // 서버에 데이터 전송 및 처리
      axios.post("http://localhost:3333/data", data, { headers: { "Content-Type": "application/json" } })
      // axios.post("/Home1", data)
        .then((response) => {
          // 등록 후 작업 수행
          alert("데이터가 등록되었습니다.");
          console.log('Enrollment successful');
          console.log(response.data); // 서버로부터 받은 응답 데이터 출력
          navigate("/Home2", { state: { userIDs } }); // userIDs 값을 전달
        })
        .catch((error) => {
          console.log('Error while enrolling data', error); // 에러 처리
        });
    }                          
    else{
      alert("해당 정보를 모두 저장해주세요");
    }
  };

  // userIDs 값이 변경될 때마다 출력
  useEffect(() => {
    console.log("userIDs:", userIDs);
  }, [userIDs]);  

  // 수정 버튼 클릭 처리 함수
  const handleEdit = (index) => {
    const { info0, info1, info2 } = infoList[index];
    setInfo0(info0);
    setInfo1(info1);
    setInfo2(info2);
    setEditIndex(index);
  };

  // 삭제 버튼 클릭 처리 함수
  const handleDelete = (index) => {
    const updatedInfoList = [...infoList];
    updatedInfoList.splice(index, 1);
    setInfoList(updatedInfoList);
  };

   // 순번 반환 함수
  const getSequenceNumber = (index) => {
    return index + 1;
  };

  return (
    <div className='total'>
        <div className="container">
            <div className="input-container">
                <input className="input-field" placeholder='Device ID' type="text" value={info0} onChange={handleInfo0Change} />
                <input className="input-field" placeholder='User ID' type="text" value={info1} onChange={handleInfo1Change} />
                <input className="input-field" placeholder='User Name' type="text" value={info2} onChange={handleInfo2Change} />
                <button onClick={handleSave} className="save-button">{editIndex !== -1 ? 'Update' : 'Save'}</button>
                <button onClick={handleEnroll} className="enroll-button">{editIndex !== -1 ? 'Enroll' : 'Enroll'}</button>
            </div>
        </div>
      <ul className="info-list">
        {infoList.map((info, index) => (
          <li key={index}  className="info-item">
            <p className="sequence-number">{getSequenceNumber(index)}번째 해경</p>
            <p className="info">device ID &nbsp; &nbsp;: {info.info0}</p>
            <p className="info">user ID &nbsp; &nbsp; &nbsp; &nbsp;: {info.info1}</p>
            <p className="info">user name &nbsp;: {info.info2}</p>
            <div className="button-group">
                <button onClick={() => handleEdit(index)} className="edit-button">Edit</button>
                <button onClick={() => handleDelete(index)} className="delete-button">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Section0;