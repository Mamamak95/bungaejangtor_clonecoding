import React from "react";
import '../style/signup/signup.css';

export default function SignUp(){
  return(
    <div className="signup">
      <h2>회원가입</h2>
      <form className="signForm">
        <div className="signId">
          <label htmlFor="id">아이디</label>
          <input type="text" name="id"/>
          <button>아이디 중복 확인</button>
          <p>6 ~ 16 자까지 영문자(대소문자), 숫자 사용 가능합니다.</p>
          <p>사용 가능한 아이디 입니다.</p>
          <p>사용 불가능한 아이디 입니다.</p>
        </div>
        <div className="signpass">
          <label htmlFor="pass">비밀번호</label>
          <input type="text" name="pass"/>
          <p>6 ~ 16 자까지 영문자(대소문자), 숫자 및 특수문자 사용 가능합니다</p>
          <p>3 자리 연속 또는 같은 문자, 아이디는 사용할 수 없습니다.</p>
          <p>사용 가능한 비밀번호 입니다.</p>
          <p>사용 불가능한 비밀번호 입니다.</p>
        </div>
        <div className="signpasscheck">
          <label htmlFor="passcheck">비밀번호 확인</label>
          <input type="text" name="passcheck"/>
          <p>위 입력한 비밀번호를 올바르게 입력하셨습니다.</p>
          <p>위 입력한 비밀번호와 일치하지 않습니다.</p>
        </div>
        <div className="signnicname">
          <label htmlFor="nicname">닉네임</label>
          <input type="text" name="nicname"/>
        </div>
        <div className="signemail">
          <label htmlFor="email">이메일</label>
          <input type="text" name="email" /> @ <input type="text" /> 
          <select>
            <option>naver.com</option>
            <option>daum.net</option>
            <option>gmail.com</option>
          </select>
        </div>
        <div className="signphone">
          <label htmlFor="phone">휴대폰</label>
          <input type="text" name="phone"/> - <input type="text" /> - <input type="text" />
          <p><input type="checkbox" /><label>SNS 수신 허용</label></p>
          <p><input type="checkbox" /><label>E-mail 수신 허용</label></p>
        </div>
      </form>
    </div>
  );
}