import { useState } from "react";
import '../style/register/Register.css';
import ProductCategory from '../component/Register/ProductCategory';

export default function ProductRegister() {
  let location = '경기도 성남시 중원구 성남동' // 나중에 api 데이터로 변경

  let [form, setForm] = useState({ 'productName': '', 'category': '',   location } )
  let [textNum, setTextNum] = useState(0);  // 상품이름 input 글자수 체크
  let [show, setShow] = useState(false);  // 상품이름 input 테두리 색 온오프
  const [active, setActive] = useState(false) // '상세 카테고리를 선택해주세요.' 멘트 온오프
  let [first, setFirst] = useState(''); // 카테고리 천째칸
  let [second, setScond] = useState(''); // 카테고리 둘째칸
  let [last, setLast] = useState(''); // 카테고리 셋째칸

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  } //input 값 onChange시 value값 재 할당

  let textNumCheck = (e) => {
    let txtNum = e.target.value.length;
    setTextNum(txtNum); //txtNum의 수에따라 input 테두리색을 위해 클래스 add , remove
    if (txtNum === 1) {
      setShow(true)
      e.target.classList.add('on')
    } else {
      setShow(false)
      e.target.classList.remove('on')
    }
  }

  let catagoryClick = (boolean, value, txt, n) => {
    setActive(boolean) // active boolean 값에 따라  '상세 카테고리를 선택해주세요.' 텍스트 노출 미노출
    setForm({ ...form, category: value }); // 카테고리 value값 재 할당
    if (n === 0) {
      setFirst(txt)
      setScond('') // 선택한 카테고리가 첫 카테고리면 둘쨰 셋쨰는 비워야함
      setLast('')
    } else if (n === 1) {
      setScond(txt)
      setLast('')  // 선택한 카테고리가 두번쨰 카테고리면  셋쨰는 비워야함

    } else {
      setLast(txt)
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(form);
  }

  return (
    <form className="inner" onSubmit={handleSubmit}>

      <fieldset>
        <h2 className="ProductRegisterTitle">기본정보<span>*필수항목</span></h2>
        <div className="inputContainer">
          <p className="inputTitle">상품이미지<span className="red">*</span><small>(0/5)</small></p>
          <div>
            <span id="imageInput">
              <input type="file" accept="image/jpg, image/jpeg, image/png" multiple />
              <i className="xi-camera"><span>이미지 등록</span></i>
            </span>
            <span className="imgExplain">상품 이미지는 PC에서는 1:1, 모바일에서는 1:1.23 비율로 보여져요.</span>
          </div>
        </div>
        <div className="inputContainer">
          <p className="inputTitle">상품명</p>
          <div className="nameInput">
            <input type="text" id="productName" name="productName" value={form.productName} onChange={(e) => {
              textNumCheck(e);
              handleChange(e);
            }} maxLength='40' placeholder="상품명을 입력해 주세요." />
            <span>{textNum}/40</span>
            <span className="notice">
              {show && <><i className="xi-ban"></i>상품명을 입력해 주세요.</>}
            </span>
          </div>
        </div>
        <div className="inputContainer">
          <p className="inputTitle">카테고리</p>
          <div className="productCategory">
            <ProductCategory class='register' onClick={catagoryClick} />
            {active && <span className="categoryNotice"><i className="xi-close-circle-o"></i>상세 카테고리를 선택해주세요.</span>}
            <span className="choiceCategory">선택한 카테고리 :{first && <b>{first}</b>} {second && <b> &gt; {second}</b>}{last && <b> &gt; {last}</b>}</span>
          </div>
        </div>
        <div className="inputContainer">
          <p className="inputTitle">거래지역</p>
          <div className="sellerLocation">
            <ul>
              <li>내 위치</li>
              <li>최근 지역</li>
              <li>주소 검색</li>
              <li>지역설정안함</li>
            </ul>
            <input type="text" value={location} disabled />
          </div>
        </div>
        <div className="inputContainer">
          <p className="inputTitle">상품상태</p>
          <div>
            <label for="newProduct" className="productRadio">
              <input id="newProduct" type="radio" name="use" />새 상품 (미사용)
              <span >사용하지 않은 새 상품</span>
            </label>
            <label for="newProduct2" className="productRadio">
              <input id="newProduct2" type="radio" name="use"/>사용감 없음
              <span >사용은 했지만 눈에 띄는 흔적이나 얼룩이 없음</span>
            </label>
            <label for="newProduct3" className="productRadio">
              <input id="newProduct3" type="radio" name="use"/>사용감 적음
              <span >눈에 띄는 흔적이나 얼룩이 약간 있음</span>
            </label>
            <label for="newProduct4" className="productRadio">
              <input id="newProduct4" type="radio" name="use"/>사용감 많음
              <span >눈에 띄는 흔적이나 얼룩이 많이 있음</span>
            </label>
            <label for="newProduct5" className="productRadio">
              <input id="newProduct5" type="radio" name="use"/> 고장/파손 상품
              <span >기능 이상이나 외관 손상 등으로 수리/수선 필요</span>
            </label>
          </div>
        </div>



        <button className="submit">전송</button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

      </fieldset>

    </form>
  );
}