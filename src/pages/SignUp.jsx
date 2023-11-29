import React, { useRef, useState } from "react";
import '../style/signup/signup.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function SignUp(){
  const navigate = useNavigate();
  const [signInfo, setSignInfo] = useState({uid : "", pw : "", pwcheck : "", name : "", email : "", tel : ""})
  const [checkError, setCheckError] = useState('');
  // setCheckError('특수문자 사용은 불가능하며 영문자(대소문자), 숫자를 혼합하여 6 ~ 16 자로 입력해주세요.')

  const [idBlurCheck, setIdBlurCheck] = useState('');

  /* 폼 체크박스 */
  const [isSnsChecked, setIsSnsChecked] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);

  /* 폼 체크박스 */
  const handleSnsCheckChange = () => {
    setIsSnsChecked(!isSnsChecked);
  };
  const handleEmailCheckChange = () => {
    setIsEmailChecked(!isEmailChecked);
  };


  /* 각 input 들 레퍼런스 값 설정 */
  const inputId = useRef(null)
  const inputPass = useRef(null)
  const inputPassCheck = useRef(null)
  const inputNicName = useRef(null)
  const inputEmail = useRef(null)
  const inputPhone = useRef(null)
  const idCheckP = useRef(null)

  /* 회원가입 확인 or 엔터 */
  const handleSubmit = (e) => {
    e.preventDefault();

    if(signInfo.uid === ''){
      alert('아이디를 입력해주세요.')
      return inputId.current.focus();
    }
    if(signInfo.pw === ''){
      alert('비밀번호를 입력해주세요.')
      return inputPass.current.focus();
    }
    if(signInfo.pwcheck === ''){
      alert('비밀번호 확인을 해주세요.')
      return inputPassCheck.current.focus();
    }
    if(signInfo.name === ''){
      alert('닉네임을 입력해주세요.')
      return inputNicName.current.focus();
    }
    if(signInfo.email === ''){
      alert('이메일을 입력해주세요.')
      return inputEmail.current.focus();
    }
    if(signInfo.tel === ''){
      alert('폰번호를 입력해주세요.')
      return inputPhone.current.focus();
    }
    if(isSnsChecked === false){
      alert('SNS 체크박스를 확인해주세요.')
      return inputPhone.current.focus();
    }
    if(isEmailChecked === false){
      alert('Email 체크박스를 확인해주세요.')
      return inputPhone.current.focus();
    }

    axios
    .post('http://localhost:8000/sign', signInfo)
    .then(data => {
      if(data.data === 'good'){
        alert('회원가입 되셨습니다.')
        navigate('/')
      }
    })
    .catch(err => console.log(err))
  }

  /* 취소 버튼 클릭 시 입력한 정보 초기화, 각 정보입력 input 들에게 value 값을 줘야함 */
  const handleReset = (e) => {
    alert("회원정보를 다시 입력해주세요.")
    setSignInfo({uid : "", pw : "", pwcheck : "", name : "", email : "", tel : ""})
    window.location.reload();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInfo({...signInfo, [name] : value})

    // 아이디 중복 체크
    // if(name === 'uid' && value !== ''){

      let length = e.target.value.length;

      // axios
      // .get(`http://127.0.0.1:8000/sign/${value}`)
      // .then(data => {
        // if((length < 4) && ((data.data.cnt === 1) || (data.data.cnt === 0))) {
        //   setCheckError('');
        // } else if((data.data.cnt === 0) && ((length > 4 || length < 16) && (!/^[a-zA-Z0-9]*$/.test(e.target.value) )) || (length > 16)){
        //   setCheckError('사용 불가능한 아이디 입니다.')
        // } else if ((data.data.cnt === 0) ){
        //   setCheckError('사용 가능한 아이디 입니다.')
        // } else if(data.data.cnt === 1){
        //   setCheckError('이미 사용중인 아이디 입니다.');
        // }
    //   })
    //   .catch((err) => console.log(err))
    // } else if(name === 'uid' && value === ''){
    //   setCheckError('');
    // }
    
  }

  /* 아이디 중복 체크 버튼 */
  const handleDuplication = (e) => {
    let signUid = signInfo.uid;

    axios
    .get(`http://127.0.0.1:8000/sign/${signUid}`)
    .then(data => {
      if(data.data.cnt === 1){
        alert('이미 존재하는 아이디 입니다.')
        return inputId.current.focus();
      } else if(data.data.cnt === 0){
        alert('사용 가능한 아이디 입니다.')
        return inputPass.current.focus();
      } 
    })
    .catch(err => console.log(err))
  }

  /* 아이디 입력란에서 벗어났을때 유효성 체크 */
  const handleBlurUid = (e) => {
    
    if (e.target.value.length === 0) {
      setIdBlurCheck('사용하실 아이디를 입력해주세요.')
    } else if(e.target.value.length < 4 || e.target.value.length > 16 ){
      setIdBlurCheck('4 ~ 16 자 까지 사용 가능합니다.')
    } else if(!/^[a-zA-Z0-9]*$/.test(e.target.value)){
      setIdBlurCheck('아이디는 한글 및 특수문자 사용이 불가능합니다.');
    } else {
      setIdBlurCheck('')
    }
  }


  return(
    <div className="signup">
      <h2 className="signtitle">회원가입</h2>
      <form className="signForm" onSubmit={handleSubmit}>
        <div className="signId">
          <label htmlFor="uid">아이디</label>
          <input type="text" name="uid" value={signInfo.uid} ref={inputId} onChange={handleChange} onBlur={handleBlurUid} placeholder="아이디를 입력해주세요."/>
          <button type="button" className="idoverlapcheck" onClick={handleDuplication}>아이디 중복 확인</button>
          { idBlurCheck && <p style={{ color: 'red' }}>({idBlurCheck})</p> }
        </div>

        <div className="signpass">
          <label htmlFor="pw">비밀번호</label>
          <input type="password" name="pw" value={signInfo.pw} ref={inputPass} onChange={handleChange} placeholder="비밀번호를 입력해주세요."/>
          <p>6 ~ 16 자까지 영문자(대소문자), 숫자 및 특수문자 사용 가능합니다</p>
          <p>사용 가능한 비밀번호 입니다.</p>
          <p>사용 불가능한 비밀번호 입니다.</p>
        </div>

        <div className="signpasscheck">
          <label htmlFor="pwcheck">비밀번호 확인</label>
          <input type="password" name="pwcheck" value={signInfo.pwcheck} ref={inputPassCheck} onChange={handleChange}/>
          <p>위 입력한 비밀번호를 올바르게 입력하셨습니다.</p>
          <p>위 입력한 비밀번호와 일치하지 않습니다.</p>
        </div>

        <div className="signnicname">
          <label htmlFor="name">닉네임</label>
          <input type="text" name="name" value={signInfo.name} ref={inputNicName} onChange={handleChange} placeholder="닉네임을 입력해주세요."/>
        </div>

        <div className="signemail">
          <label htmlFor="email">이메일</label>
          <input type="text" name="email" value={signInfo.email} ref={inputEmail} onChange={handleChange} placeholder="이메일을 입력해주세요."/>
          <select className="signemailselect">
            <option>naver.com</option>
            <option>daum.net</option>
            <option>gmail.com</option>
          </select>
        </div>
        
        <div className="signphone">
          <label htmlFor="tel">휴대폰</label>
          <input type="number" name="tel" value={signInfo.tel} ref={inputPhone} onChange={handleChange} placeholder="폰번호를 입력해주세요."/> 
          <div className="signphonecheckbox">
            <p>
              <input type="checkbox" name="snscheck" checked={isSnsChecked} onChange={handleSnsCheckChange}/><label>SNS 수신 허용</label>
            </p>
            <p>
              <input type="checkbox" name="emailcheck" checked={isEmailChecked} onChange={handleEmailCheckChange}/><label>E-mail 수신 허용</label>
            </p>
          </div>
        </div>

        <div className="signcheckbar">
          <div className="signcheckBtn">
            <button type="button" className="signcancel" onClick={handleReset}>취소</button>
            <div></div>
            <button className="signcheck">확인</button>
          </div>
        </div>
      </form>
    </div>
  );
}