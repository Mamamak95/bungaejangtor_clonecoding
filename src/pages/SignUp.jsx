import React, { useRef, useState } from "react";
import '../style/signup/signup.css';
import { useNavigate } from "react-router-dom";

export default function SignUp(){
  const navigate = useNavigate();
  const [signInfo, setSignInfo] = useState({id : "", pass : "", passcheck : "", nicname : "", email : "", phone : ""})

  /* 각 input 들 레퍼런스 값 설정 */
  const inputId = useRef(null)
  const inputPass = useRef(null)
  const inputPassCheck = useRef(null)
  const inputNicName = useRef(null)
  const inputEmail = useRef(null)
  const inputPhone = useRef(null)

  /* 취소 버튼 클릭 시 입력한 정보 초기화, 각 정보입력 input 들에게 value 값을 줘야함 */
  const handleReset = (e) => {
    alert("회원정보를 다시 입력해주세요.")
    setSignInfo({id : "", pass : "", passcheck : "", nicname : "", email : "", phone : ""})
    window.location.reload();
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInfo({...signInfo, [name] : value})
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    if(signInfo.id === ''){
      alert('아이디를 입력해주세요.')
      return inputId.current.focus();
    }
    if(signInfo.pass === ''){
      alert('비밀번호를 입력해주세요.')
      return inputPass.current.focus();
    }
    if(signInfo.passcheck === ''){
      alert('비밀번호 확인을 해주세요.')
      return inputPassCheck.current.focus();
    }
    if(signInfo.nicname === ''){
      alert('닉네임을 입력해주세요.')
      return inputNicName.current.focus();
    }
    if(signInfo.email === ''){
      alert('이메일을 입력해주세요.')
      return inputEmail.current.focus();
    }
    if(signInfo.phone === ''){
      alert('폰번호를 입력해주세요.')
      return inputPhone.current.focus();
    }
  }


  return(
    <div className="signup">
      <h2 className="signtitle">회원가입</h2>
      <form className="signForm" onSubmit={handleSubmit}>
        <div className="signId">
          <label htmlFor="id">아이디</label>
          <input type="text" name="id" value={signInfo.id} ref={inputId} onChange={handleChange} placeholder="아이디를 입력해주세요."/>
          <button type="button" className="idoverlapcheck">아이디 중복 확인</button>
          <p>6 ~ 16 자까지 영문자(대소문자), 숫자 사용 가능합니다.</p>
          <p>사용 가능한 아이디 입니다.</p>
          <p>사용 불가능한 아이디 입니다.</p>
        </div>

        <div className="signpass">
          <label htmlFor="pass">비밀번호</label>
          <input type="password" name="pass" value={signInfo.pass} ref={inputPass} onChange={handleChange} placeholder="비밀번호를 입력해주세요."/>
          <p>6 ~ 16 자까지 영문자(대소문자), 숫자 및 특수문자 사용 가능합니다</p>
          <p>3 자리 연속 또는 같은 문자, 아이디는 사용할 수 없습니다.</p>
          <p>사용 가능한 비밀번호 입니다.</p>
          <p>사용 불가능한 비밀번호 입니다.</p>
        </div>

        <div className="signpasscheck">
          <label htmlFor="passcheck">비밀번호 확인</label>
          <input type="password" name="passcheck" value={signInfo.passcheck} ref={inputPassCheck} onChange={handleChange}/>
          <p>위 입력한 비밀번호를 올바르게 입력하셨습니다.</p>
          <p>위 입력한 비밀번호와 일치하지 않습니다.</p>
        </div>

        <div className="signnicname">
          <label htmlFor="nicname">닉네임</label>
          <input type="text" name="nicname" value={signInfo.nicname} ref={inputNicName} onChange={handleChange} placeholder="닉네임을 입력해주세요."/>
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
          <label htmlFor="phone">휴대폰</label>
          <input type="number" name="phone" value={signInfo.phone} ref={inputPhone} onChange={handleChange} placeholder="폰번호를 입력해주세요."/> 
          <div className="signphonecheckbox">
            <p><input type="checkbox" name="snscheck"/><label>SNS 수신 허용</label></p>
            <p><input type="checkbox" name="emailcheck"/><label>E-mail 수신 허용</label></p>
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