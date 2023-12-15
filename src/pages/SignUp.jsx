import React, { useEffect, useRef, useState } from "react";
import '../style/signup/signup.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { FaRegEye, FaRegEyeSlash  } from "react-icons/fa6";

export default function SignUp(){
  const navigate = useNavigate();
  const [signInfo, setSignInfo] = useState({uid : "", pw : "", pwcheck : "", name : "", email : "", tel : ""})

  /* 아이디 중복 확인 */
  const [idCheckBtn, setIdCheckBtn] = useState(0);
  const [idBlurCheck, setIdBlurCheck] = useState('');
  const [idChangeCheck, setIdChangeCheck] = useState(false);

  const [idChecked, setIdChecked] = useState(false)

  /* 비밀번호 중복 확인, 비밀번호 가리기 토글 */
  const [pwLengthCheck, setPwLengthCheck] = useState('');
  const [pwMixCheck, setPwMixCheck] = useState('');
  const [pwSameCheck, setPwSameCheck] = useState('');
  const [pwLookToggle, setPwLookToggle] = useState(false);
  const [pwLookCheckToggle, setPwLookCheckToggle] = useState(false);

  /* 닉네임 체크 */
  const [nameCheck, setNameCheck] = useState('');

  /* 폰번호 체크, 폰번호 중복 시 회원가입 막기 */
  const [phoneCheck, setPhoneCheck] = useState('');

  /* 폼 체크박스 */
  const [isSnsChecked, setIsSnsChecked] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);

  /* 비밀번호 가리기 토글 아이콘 */
  const handlePwLookToggle = (e) => {
    setPwLookToggle(!pwLookToggle)
  }
  const handlePwLookCheckToggle = (e) => {
    setPwLookCheckToggle(!pwLookCheckToggle)
  }

  /* 폼 체크박스 체크 */
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

  /* 회원가입 확인 or 엔터 */
  const handleSubmit = async(e) => {
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
    if(inputPhone === ''){
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

    // 아이디 중복 확인 후 아이디를 
    if(!idChangeCheck){
      alert('아이디 중복 체크를 다시 해주세요')
      inputId.current.focus();
      return;
    }


    let signTel = signInfo.tel

    await axios
    .get(`http://127.0.0.1:8000/sign/user/${signTel}`)
    .then(data => {
      console.log(data.data);
      if(data.data.cnt === 1){
        alert('이미 등록된 폰번호 입니다.')
        return inputPhone.current.focus();
      } else {
        if(idChecked){ 
          axios
          .post('http://localhost:8000/sign', signInfo)
          .then(data => {
            if(data.data === 'good'){
              alert('회원가입 되셨습니다.')
              navigate('/')
            }
          })
          .catch(err => console.log(err))
        } else if(!idChecked){
          inputId.current.focus();
        }
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

  /* 각 input 의 name, value 구조분해, 아이디 체킹 */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInfo({...signInfo, [name] : value})

    if(name === 'uid'){
      setIdChangeCheck(false)
    }
    
  }

  /* 아이디 중복 체크 버튼 */
  const handleDuplication = (e) => {
    let signUid = signInfo.uid;
    let idValue = inputId.current.value;

    if((idValue.length < 4 || idValue.length > 16) && (!/^[a-zA-Z0-9]*$/.test(idValue))){
      alert('사용할 수 없는 아이디 입니다.')
      setIdBlurCheck('이미 중복된 아이디가 있습니다.')
      return inputId.current.focus();
    } 

    // setIdCheckBtn 값이 2 이면 중복된아이디, 1 이면 사용가능아이디
    axios
    .get(`http://127.0.0.1:8000/sign/${signUid}`)
    .then(data => {
      if(data.data.cnt === 1){
        alert('이미 존재하는 아이디 입니다.')
        setIdCheckBtn(2)
        setIdChangeCheck(false)
        setIdChecked(false);
        setIdBlurCheck('이미 중복된 아이디가 있습니다.')
        return inputId.current.focus();
      } else if(data.data.cnt === 0){
        alert('사용할 수 있는 아이디 입니다.')
        setIdCheckBtn(1)
        setIdChangeCheck(true)
        setIdBlurCheck('사용 가능한 아이디 입니다.')
        setIdChecked(true);
        inputId.current.style.borderBottom = '1px solid #888';
        return inputPass.current.focus();
      }
    })
    .catch(err => console.log(err))
  }

  /* input 포커싱 */
  const handleFocusInput = (e) => {
    e.target.style.outline = 'none';
    e.target.style.borderBottom = '1px solid red';
  }

  /* 아이디 입력란에서 벗어났을때 유효성 체크 */
  const handleBlurUid = (e) => {
    e.target.style.outline = 'none';
    e.target.style.borderBottom = '1px solid red';
    
    if (e.target.value.length === 0) {
      setIdBlurCheck('사용하실 아이디를 입력해주세요.')
    } else if(e.target.value.length < 4 || e.target.value.length > 16 ){
      setIdBlurCheck('4 ~ 16 자 까지 사용 가능합니다.')
    } else if(!/^[a-zA-Z0-9]*$/.test(e.target.value)){
      setIdBlurCheck('아이디는 한글 및 특수문자 사용이 불가능합니다.');
    } else if(idCheckBtn === 0){
      setIdBlurCheck('아이디 중복 확인을 해주세요.')
    }
  }

  /* 비밀번호 입력란 길이 및 영문,특수문자,숫자 사용 체크 */
  const handleBlurPw = (e) => {
    e.target.style.outline = 'none';
    e.target.style.borderBottom = '1px solid red';

    if (e.target.value.length === 0) {
      setPwLengthCheck('사용하실 비밀번호를 입력해주세요.')
    } else if(e.target.value.length < 4 || e.target.value.length > 16 ){
      setPwLengthCheck('4 ~ 16 자 까지 사용 가능합니다.')
    } else if(e.target.value.length > 4 || e.target.value.length < 16){
      setPwLengthCheck('')
      e.target.style.borderBottom = '1px solid #888';
    }
    
    if(!/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(e.target.value)){
      setPwMixCheck('영문, 특수문자, 숫자를 각 1개 이상씩 혼합해야 합니다.');
    } else {
      setPwMixCheck('사용 가능한 비밀번호 입니다.')
      e.target.style.borderBottom = '1px solid #888';
    }
  }

  /* 비밀번호 확인 체크 */
  const handleBlurPwSame = (e) => {
    e.target.style.outline = 'none';
    e.target.style.borderBottom = '1px solid red';

    if(e.target.value === '') {
      e.target.style.borderBottom = '1px solid red';
      setPwSameCheck('비밀번호를 확인해 주세요.')
    } else if(inputPass.current.value === e.target.value){
      e.target.style.borderBottom = '1px solid #888';
      setPwSameCheck('비밀번호가 일치합니다.')
    } else if(inputPass.current.value !== e.target.value){
      e.target.style.borderBottom = '1px solid red';
      setPwSameCheck('비밀번호가 일치하지 않습니다.')
    } 
  }

  /* 닉네임 체크 */
  const handleBlurName = (e) => {
    e.target.style.outline = 'none';
    e.target.style.borderBottom = '1px solid red';

    if(inputNicName.current.value === ''){
      setNameCheck('닉네임을 입력해주세요.')
    } else {
      setNameCheck('올바르게 입력하셨습니다.')
      e.target.style.borderBottom = '1px solid #888';
    }
    
  }

  /* 폰번호 체크 */
  const handleBlurPhone = (e) => {
    e.target.style.outline = 'none';
    e.target.style.borderBottom = '1px solid red';

    if(inputPhone.current.value === ''){
      setPhoneCheck('폰번호를 입력해주세요.')
    } else if(!/^[0-9]+$/.test(inputPhone.current.value)){
      setPhoneCheck('숫자만 입력해주세요.')
    } else if(inputPhone.current.value.length < 10 || inputPhone.current.value.length > 11){
      setPhoneCheck('번호를 재확인 해주세요.')
    } else {
      setPhoneCheck('올바른 양식 입니다.')
      e.target.style.borderBottom = '1px solid #888';
    }
  }

  return(
    <div className="signup">
      <h2 className="signtitle">회원가입</h2>
      <p className="signsubtitle">번개장터 계정으로 사용하실 회원정보를 입력해 주세요</p>
      <form className="signForm" onSubmit={handleSubmit}>
        <div className="signId">
          <input type="text" name="uid" placeholder="아이디를 입력해주세요."
            value={signInfo.uid} 
            ref={inputId}
            onFocus={handleFocusInput}
            onBlur={handleBlurUid}
            onChange={handleChange}
          />
          <button type="button" className="idoverlapcheck" onClick={handleDuplication}>아이디 중복 확인</button>
          { idBlurCheck && <p className="inputid">* {idBlurCheck}</p> }
        </div>

        <div className="signpass">
          <input name="pw" placeholder="비밀번호를 입력해주세요."
            type={pwLookToggle ? 'text' : 'password'}
            value={signInfo.pw} 
            ref={inputPass}
            onFocus={handleFocusInput}
            onBlur={handleBlurPw}
            onChange={handleChange}
          />
          { !pwLookToggle ? <FaRegEye onClick={handlePwLookToggle} /> : <FaRegEyeSlash onClick={handlePwLookToggle} /> }
          { pwLengthCheck && <p style={{ color: 'red' }}>* {pwLengthCheck}</p> }
          { pwMixCheck && <p style={{ color: 'red' }}>* {pwMixCheck}</p> }
        </div>

        <div className="signpasscheck">
          <input name="pwcheck" placeholder="비밀번호를 확인해주세요."
            type={pwLookCheckToggle ? 'text' : 'password'}
            value={signInfo.pwcheck}
            onFocus={handleFocusInput}
            onBlur={handleBlurPwSame}
            onChange={handleChange} 
            ref={inputPassCheck} 
          />
          <FaRegEye />
          { !pwLookCheckToggle ? <FaRegEye onClick={handlePwLookCheckToggle}/> : <FaRegEyeSlash onClick={handlePwLookCheckToggle}/> }
          { pwSameCheck && <p style={{ color: 'red' }}>* {pwSameCheck}</p> }
        </div>

        <div className="signnicname">
          <input type="text" name="name" placeholder="닉네임을 입력해주세요."
            value={signInfo.name} 
            ref={inputNicName}
            onFocus={handleFocusInput}
            onBlur={handleBlurName}
            onChange={handleChange} 
          />
          { nameCheck && <p style={{ color: 'red' }}>* {nameCheck}</p> }
        </div>

        <div className="signemail">
          <input type="text" name="email" placeholder="이메일을 입력해주세요."
            value={signInfo.email} 
            ref={inputEmail}
            onFocus={handleFocusInput}
            onChange={handleChange} 
          />
          <select className="signemailselect">
            <option>naver.com</option>
            <option>daum.net</option>
            <option>gmail.com</option>
          </select>
        </div>
        
        <div className="signphone">
          <input type="tel" name="tel" placeholder="폰번호를 입력해주세요."
            value={signInfo.tel} 
            ref={inputPhone}
            onFocus={handleFocusInput}
            onBlur={handleBlurPhone}
            onChange={handleChange}
          /> 
          {/* { !isPhoneVal ? <p style={{ color: 'red' }}>숫자만 입력해주세요.</p> : '' } */}
          { phoneCheck && <p style={{ color: 'red' }}>* {phoneCheck}</p> }
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
            <button className="signcheck">확인</button>
          </div>
        </div>
      </form>
    </div>
  );
}