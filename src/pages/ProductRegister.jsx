import { useRef, useState } from "react";
import '../style/register/Register.css';
import ProductCategory from '../component/Register/ProductCategory';

export default function ProductRegister() {

  // 초기 위치 정보 (나중에 API 데이터로 변경될 수 있음)
  let location = '경기도 성남시 중원구 성남동'
  // 상태 관리를 위한 useState 훅 사용
  let [form, setForm] = useState({ 'seller ': 'userId', 'productName': '', 'category': 'ALL', location, 'price': '', 'content': '' })
  let [textNum, setTextNum] = useState(0);  // 상품이름 input 글자수 체크
  const [active, setActive] = useState(false) // '상세 카테고리를 선택해주세요.' 멘트 온오프
  let [first, setFirst] = useState(''); // 카테고리 천째칸
  let [second, setScond] = useState(''); // 카테고리 둘째칸
  let [last, setLast] = useState(''); // 카테고리 셋째칸
  let checkNum = /^[0-9]/; // 가격 숫자만 정규식
  let [deliverPrice, setDeliverPrice] = useState(false) // 배달비칸 온 오프
  let [notice, setNotice] = useState([false, false, false, false]) // input 주의사항 메세지
  let [outline,setOutline] = useState(['','','',''])
  let [info, setInfo] = useState(0);

  const inputProductName = useRef(null);
  const inputPrice = useRef(null);
  const inputContent = useRef(null);



  const noticeTxt = (boolean, n) => {
    let copy = [...notice]
    copy[n] = boolean
    setNotice(copy) // boolean값으로 notice 메세지 띄우기 위해
  }
  const onOutline = (txt,n)=>{
    let copy = [...outline]
    copy[n] = txt
    setOutline(copy) // boolean값으로 notice 메세지 띄우기 위해
  }
  let textNumCheck = (e, n) => {
    let txtNum = e.target.value.length;
    setTextNum(txtNum); //txtNum의 수에따라 input 테두리색을 위해 클래스 add , remove
    if (txtNum === 1) {

      onOutline('on',0)
      noticeTxt(true, n)
    } else {
      noticeTxt(false, n)
      onOutline('',0)
    }
  }
  let priceNumCheck = (e, n) => {
    let priceNum = e.target.value
    if (parseInt(priceNum) < 100) {
      onOutline('on',1)
      noticeTxt(true, n)
    } else {
      onOutline('',1)
      noticeTxt(false, n)
    }
    if (!checkNum.test(priceNum)) {
      setForm({ ...form, 'price': '' });
    }

    setForm({ ...form, 'price': priceNum !== '' ? parseInt(priceNum) : '' });
  }

  let deliverPriceCheck = (e, n) => {
    let deliverPrice = e.target.value
    if (parseInt(deliverPrice) < 100) {
      noticeTxt(true, n)
      onOutline('on',2)
    } else if (parseInt(deliverPrice) > 100000) {
      noticeTxt(true, n)
      onOutline('on',2)
      e.target.value = 100000
      alert('배송비는 100원부터 100,000원까지 입력할 수 있어요.')
    } else {
      e.target.classList.remove('on')
      noticeTxt(false, n)
    }

  }


  let textAreaCheck = (e, n) => {
    let txtNum = e.target.value.length;
    setInfo(txtNum)
    if (txtNum < 10) {

      onOutline('on',3)
      noticeTxt(true, n) //boolean값으로 notice 메세지 띄우기 위해
    } else {
      noticeTxt(false, n)
      onOutline('on',3)
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  } //input 값 onChange시 value값 재 할당
  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.productName === '') {
      noticeTxt(true, 0)
      onOutline('on',0)
      return inputProductName.current.focus()
    }
    if (form.price === '') {
      noticeTxt(true, 1)
      onOutline('on',1)
      return inputPrice.current.focus()
    }
    if (form.content === '') {
      noticeTxt(true, 3)
      onOutline('on',3)
      return inputContent.current.focus()
    }
    console.log(form);
  }


  return (
    <>
      <form onSubmit={handleSubmit}>

        <fieldset className="inner">
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
              <input type="text" id="productName" className={outline[0]} name="productName" ref={inputProductName} value={form.productName} onChange={(e) => {
                textNumCheck(e, 0);
                handleChange(e);
              }} maxLength='40' placeholder="상품명을 입력해 주세요." />
              <span>{textNum}/40</span>
              <span className="notice">
                {notice[0] && <><i className="xi-ban"></i>상품명을 입력해 주세요.</>}
              </span>
            </div>
          </div>
          <div className="inputContainer">
            <p className="inputTitle">카테고리</p>
            <div className="productCategory">
              <ProductCategory class='register' onClick={catagoryClick} />
              {active && <span className="categoryNotice"><i className="xi-close-circle-o"></i>상세 카테고리를 선택해주세요.</span>}
              <p className="choiceCategory">선택한 카테고리 :{first && <span>{first}</span>} {second && <span> &gt; {second}</span>}{last && <span> &gt; {last}</span>}</p>
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
                <input id="newProduct2" type="radio" name="use" />사용감 없음
                <span >사용은 했지만 눈에 띄는 흔적이나 얼룩이 없음</span>
              </label>
              <label for="newProduct3" className="productRadio">
                <input id="newProduct3" type="radio" name="use" />사용감 적음
                <span >눈에 띄는 흔적이나 얼룩이 약간 있음</span>
              </label>
              <label for="newProduct4" className="productRadio">
                <input id="newProduct4" type="radio" name="use" />사용감 많음
                <span >눈에 띄는 흔적이나 얼룩이 많이 있음</span>
              </label>
              <label for="newProduct5" className="productRadio">
                <input id="newProduct5" type="radio" name="use" /> 고장/파손 상품
                <span >기능 이상이나 외관 손상 등으로 수리/수선 필요</span>
              </label>
            </div>
          </div>

          <div className="inputContainer">
            <p className="inputTitle">교환</p>
            <div className="formRadio">
              <label for="disable" >
                <input id="disable" type="radio" name="change" checked />불가
              </label>
              <label for="ablr" >
                <input id="ablr" type="radio" name="change" />가능
              </label>
            </div>
          </div>

          <div className="inputContainer borderNone">
            <p className="inputTitle">가격</p>
            <div >
              <p className="priceInput">
                <input type="text" id="price" className={outline[1]} name="price" ref={inputPrice} value={form.price} onChange={(e) => {
                  priceNumCheck(e, 1);
                }} maxLength='11' placeholder="가격을 입력해 주세요." />
                <span className="notice">
                  {notice[1] && <><i className="xi-ban"></i>100원 이상 입력해주세요.</>}
                </span>
              </p>
              <div className="formRadio">
                <label for="include" >
                  <input id="include" type="radio" name="deliver" checked={!deliverPrice} onChange={() => setDeliverPrice(false)} />배송비포함
                </label>
                <label for="notInclude" >
                  <input id="notInclude" type="radio" name="deliver" onChange={() => setDeliverPrice(true)} />배송비별도
                </label>
              </div>
            </div>

          </div>

          {deliverPrice &&
            <div className="inputContainer">
              <p className="inputTitle">배송비</p>
              <div >
                <p className="priceInput">
                  <input type="text" id="dleliverPrice" className={outline[2]} name="dleliverPrice" onChange={(e) => {
                    deliverPriceCheck(e, 2);
                  }} maxLength='11' placeholder="배송비를 입력해 주세요." />
                  <span className="notice">
                    {notice[2] && <><i className="xi-ban"></i>배송비는 100원부터 100,000원까지 입력할 수 있어요</>}

                  </span>
                  <b className="marginT">- 입력 시 구매자가 배송비까지 한 번에 결제할 수 있어요.</b>
                  <b>- 편의점택배 최소 금액 3,200원 (동일권, 350g 이하 기준)</b>
                </p>

              </div>

            </div>
          }
          <div className="inputContainer">
            <p className="inputTitle">설명</p>
            <div >
              <textarea rows="6" maxLength='2000' className={outline[3]} name="content" ref={inputContent} value={form.content} onChange={(e) => {
                textAreaCheck(e, 3)
                handleChange(e);
              }}></textarea>
              <p className="infoNotice">
                <span className="notice">
                  {notice[3] && <><i className="xi-ban"></i>상품 설명을 10글자 이상 입력해주세요.</>}
                </span>
                <span className="infoCheck">
                  {info}/2000
                </span>
              </p>
              {
                info ? null :
                  <div className="infoNoticeTxt">
                    구매시기, 브랜드/모델명, 제품의 상태 (사용감, 하자 유무) 등을 입력해 주세요.<br />
                    서로가 믿고 거래할 수 있도록, 자세한 정보와 다양한 각도의 상품 사진을 올려주세요.<br />
                    <span>* 안전하고 건전한 거래 환경을 위해 과학기술정보통신부, 한국인터넷진흥원과 번개장터(주)가 함께 합니다.</span>
                  </div>
              }


            </div>


          </div>

          <div className="inputContainer">
            <p className="inputTitle">태그</p>
            <div className="nameInput">
              <input type="text" readOnly placeholder="태그를 입력해 주세요. (최대 5개)" />
              <b className="marginT">- 태그는 띄어쓰기로 구분되며 최대 9자까지 입력할 수 있어요.</b>
              <b>- 내 상품을 다양한 태그로 표현해 보세요.</b>
              <b>- 사람들이 내 상품을 더 잘 찾을 수 있어요.</b>
              <b>- 상품과 관련 없는 태그를 입력할 경우, 판매에 제재를 받을 수 있어요.</b>

            </div>
          </div>
          <div className="inputContainer borderNone">
            <p className="inputTitle">수량</p>
            <div >
              <p className="priceInput quantity">
                <input type="text" readOnly value={1} placeholder="수량을 입력해 주세요." />
              </p>

            </div>

          </div>





        </fieldset>
        <div className="submitBar">
          <ul className="inner">
            <li><button readOnly>임시저장</button></li>
            <li><button className="submit">등록하기</button></li>
          </ul>
        </div>
      </form>
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
    </>
  );
}