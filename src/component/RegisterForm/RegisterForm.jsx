import { useEffect, useRef, useState } from "react";
import '../../style/register/Register.css';
import ProductCategory from '../Register/ProductCategory';
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CgClose } from "react-icons/cg";
import { getUser } from "../../util/localStorage";

export default function RegisterForm(props) {
  const userInfo = getUser() ? getUser() : '';
  let { pid } = useParams();

  // 초기 위치 정보 (나중에 API 데이터로 변경될 수 있음)
  let place = '경기도 성남시 중원구 성남동'
  // 상태 관리를 위한 useState 훅 사용
  let [saveImg, setSaveImg] = useState([]);
  let [deleteImg, setDeleteImg] = useState([]);
  let [formImg, setFormImg] = useState([]); // 이미지 넘길 변수
  let [tempImg, setTempImg] = useState([]);
  let [form, setForm] = useState({ 'img': '', 'seller': userInfo.uid, 'productName': '', 'category': 'ALL', place, 'price': '', 'content': '' });


  let [textNum, setTextNum] = useState(0);  // 상품이름 input 글자수 체크
  const [active, setActive] = useState(false) // '상세 카테고리를 선택해주세요.' 멘트 온오프
  let [first, setFirst] = useState(''); // 카테고리 천째칸
  let [second, setScond] = useState(''); // 카테고리 둘째칸
  let [last, setLast] = useState(''); // 카테고리 셋째칸
  let checkNum = /^[0-9]/; // 가격 숫자만 정규식
  let [deliverPrice, setDeliverPrice] = useState(false) // 배달비칸 온 오프
  let [notice, setNotice] = useState([false, false, false, false, false]) // input 주의사항 메세지
  let [outline, setOutline] = useState(['', '', '', '', '']) //input 주의사항 테두리
  let [info, setInfo] = useState(0);
  let [thumnail, setThumnail] = useState([]); // 이미지 미리보기 썸네일
  const inputImg = useRef(null);
  const inputProductName = useRef(null);
  const inputPrice = useRef(null);
  const inputContent = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes(`/products/new/${userInfo.uid}`) && (localStorage.getItem(`saveImg_${userInfo.uid}`) || localStorage.getItem(`saveData_${userInfo.uid}`))) {

      let txtData = JSON.parse(localStorage.getItem(`saveData_${userInfo.uid}`));
      setForm(txtData);
      setTempImg(JSON.parse(localStorage.getItem(`saveImg_${userInfo.uid}`)));

      txtData.content ? setInfo(txtData.content.length) : setInfo(0)

    } else if (location.pathname.includes(`/edit/${pid}`) && (localStorage.getItem(`editSaveImg_${userInfo.uid}`) || localStorage.getItem(`editSaveData_${userInfo.uid}`))) {

      let txtData = JSON.parse(localStorage.getItem(`editSaveData_${userInfo.uid}`));
      setForm(txtData);
      setTempImg(JSON.parse(localStorage.getItem(`editSaveImg_${userInfo.uid}`)));
      // setSaveImg(props.images)

      txtData.content ? setInfo(txtData.content.length) : setInfo(0)

    } else {
      setForm(props.data ? props.data : form);
      props.data ? setInfo(props.data.content.length) : setInfo(0)
      setSaveImg(props.images)
    }
    // 컴포넌트가 처음 마운트될 때나 userInfo가 변경될 때만 실행


  }, [props.data]);

  const onClickSave = (e) => {

    const formData = new FormData();

    for (let i = 0; i < formImg.length; i++) {
      formData.append('images', formImg[i]);
    }

    axios({
      method: 'post',
      url: `http://192.168.50.57:8000/save/${userInfo.uid}`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(result => {
        if (location.pathname.includes(`/products/new/${userInfo.uid}`)) {
          localStorage.setItem(`saveImg_${userInfo.uid}`, JSON.stringify([...result.data, ...tempImg]));
          localStorage.setItem(`saveData_${userInfo.uid}`, JSON.stringify(form));
          alert('임시저장 되었습니다.')
        } else if (location.pathname.includes(`/edit/${pid}`)) {
          saveImg = saveImg.map(v => v.img)
          localStorage.setItem(`editSaveImg_${userInfo.uid}`, JSON.stringify([...saveImg, ...tempImg, ...result.data]));
          localStorage.setItem(`editSaveData_${userInfo.uid}`, JSON.stringify(form));
          alert('임시저장 되었습니다.')
        }


      })
      .catch(err => console.log('에러==>' + err))
  }



  const noticeTxt = (boolean, n) => {
    let copy = [...notice]
    copy[n] = boolean
    setNotice(copy) // boolean값으로 notice 메세지 띄우기 위해
  }
  const onOutline = (txt, n) => {
    let copy = [...outline]
    copy[n] = txt
    setOutline(copy) // boolean값으로 notice 메세지 띄우기 위해
  }



  let deliverPriceCheck = (e, n) => {
    let deliverPrice = e.target.value
    if (parseInt(deliverPrice) < 100) {
      noticeTxt(true, n)
      onOutline('on', 2)
    } else if (parseInt(deliverPrice) > 100000) {
      noticeTxt(true, n)
      onOutline('on', 2)
      e.target.value = 100000
      alert('배송비는 100원부터 100,000원까지 입력할 수 있어요.')
    } else {
      e.target.classList.remove('on')
      noticeTxt(false, n)
    }

  }

  let closeImg = (e, value) => {


    if (value === 'thumnail') {
      setThumnail(thumnail = thumnail.filter(v => v !== thumnail[e.target.value]))
      setFormImg(formImg = formImg.filter(v => v !== formImg[e.target.value]))
    } else if (value === 'tempImg') {
      setTempImg(tempImg = tempImg.filter(v => v !== tempImg[e.target.value]))
    } else if (value === 'saveImg') {
      setSaveImg((saveImg) => saveImg.filter((v) => parseInt(v.imageid) !== parseInt(e.target.dataset.imagenum)));

    }



    let deleteImgSubmit = [];
    deleteImgSubmit.push(e.target.dataset.imagenum)
    setDeleteImg([...deleteImg, ...deleteImgSubmit])
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
  const handleChange = (e, n) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value }); //input 값 onChange시 value값 재 할당


    if (name === 'img') {
      if (e.target.files.length + saveImg.length + tempImg.length <= 5 && thumnail.length + saveImg.length + tempImg.length <= 4) {
        const files = e.target.files;
        setFormImg([]);
        setFormImg([...formImg, ...files]);

        for (const file of Object.values(files)) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setThumnail((prevThumnail) => [...prevThumnail, reader.result]);
          };
          reader.readAsDataURL(file);
        }

        onOutline('', 4);
        noticeTxt(false, 4);
      } else {
        alert('이미지는 5장까지 업로드 가능합니다.');
      }


    } else {

    }
    if (name === 'productName') { // 상품이름 유효성 검사
      let txtNum = value.length;
      setTextNum(txtNum); //txtNum의 수에따라 input 테두리색을 위해 클래스 add , remove
      if (txtNum === 1) {

        onOutline('on', 0)
        noticeTxt(true, n)
      } else {
        noticeTxt(false, n)
        onOutline('', 0)
      }
    }
    if (name === 'price') {
      let priceNum = e.target.value
      if (parseInt(priceNum) < 100) {
        onOutline('on', 1)
        noticeTxt(true, n)

      } else {
        onOutline('', 1)
        noticeTxt(false, n)
        setForm({ ...form, 'price': '' });

      }
      if (checkNum.test(priceNum)) {
        setForm({ ...form, 'price': parseInt(priceNum) });
      }

    }

    if (name === 'content') {
      let txtNum = e.target.value.length;
      setInfo(txtNum)
      if (txtNum < 10) {
        onOutline('on', 3)
        noticeTxt(true, n) //boolean값으로 notice 메세지 띄우기 위해
      } else {
        noticeTxt(false, n)
        onOutline('', 3)
      }
    }

  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (formImg.length === 0 && thumnail.length === 0 && saveImg.length === 0 && tempImg.length === 0) {
      onOutline('on', 4)
      noticeTxt(true, 4)
      return inputImg.current.focus()
    }
    if (form.productName.length < 2 || form.productName === '') {
      noticeTxt(true, 0)
      onOutline('on', 0)
      return inputProductName.current.focus()
    }
    if (parseInt(form.price) < 100 || form.price === '') {
      noticeTxt(true, 1)
      onOutline('on', 1)
      return inputPrice.current.focus()
    }
    if (form.content.length < 10 || form.content === '') {
      noticeTxt(true, 3)
      onOutline('on', 3)
      return inputContent.current.focus()
    }

    const formData = new FormData();

    for (let i = 0; i < formImg.length; i++) {
      formData.append('images', formImg[i]);
    }
    formData.append('form', JSON.stringify(form))

    if (location.pathname.includes(`/products/new/${userInfo.uid}`) && (localStorage.getItem(`saveImg_${userInfo.uid}`) || localStorage.getItem(`saveData_${userInfo.uid}`))) {
      formData.append('saveImg', JSON.stringify(tempImg))

    } else if (location.pathname.includes(`/edit/${pid}`) ) {

      if((localStorage.getItem(`editSaveImg_${userInfo.uid}`) || localStorage.getItem(`editSaveData_${userInfo.uid}`))){
        formData.append('tempImg', JSON.stringify(tempImg))
      }else{
        formData.append('saveImg', JSON.stringify(saveImg))
      }
      
    }

    // formData.append('deleteImg', JSON.stringify(deleteImg))
    axios({
      method: 'post',
      url: props.edit ? `http://192.168.50.57:8000/edit/${pid}` : `http://192.168.50.57:8000/product/new/${userInfo.uid}`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(result => {
        props.edit ? alert('상품 수정이 완료되었습니다.') : alert('상품 등록이 완료되었습니다.')

        if (location.pathname.includes(`/products/new/${userInfo.uid}`)) {
          localStorage.removeItem(`saveImg_${userInfo.uid}`);
          localStorage.removeItem(`saveData_${userInfo.uid}`);
        } else if (location.pathname.includes(`/edit/${pid}`)) {
          localStorage.removeItem(`editSaveImg_${userInfo.uid}`);
          localStorage.removeItem(`editSaveData_${userInfo.uid}`);
        }

        navigate('/')
      })
      .catch(err => console.log('에러==>' + err))

  }

  let imgPreview = () => {

    if (saveImg) {

      return saveImg.length ? (
        saveImg.map((photo, i) => (
          <span className="previewContainer" key={i}>
            <img src={`http://192.168.50.57:8000/${photo.img}`} className='photoPreview' />
            <button className="imgClose" type="button" data-imagenum={photo.imageid} onClick={(e) => closeImg(e, 'saveImg')}>
              <CgClose />
            </button>
          </span>
        ))
      ) : null;


    }
    return null;
  };

  let tempPreview = () => {

    if (tempImg) {

      return tempImg.length ? (
        tempImg.map((photo, i) => (
          <span className="previewContainer" key={i}>
            <img src={`http://192.168.50.57:8000/${photo}`} className='photoPreview' />
            <button className="imgClose" type="button" value={i} onClick={(e) => closeImg(e, 'tempImg')}>
              <CgClose />
            </button>
          </span>
        ))
      ) : null;
    }
    return null;


  }



  return (

    <>
      <form onSubmit={handleSubmit}  >
        <fieldset className="inner">
          <h2 className="ProductRegisterTitle">기본정보<span>*필수항목</span></h2>
          <div className="inputContainer">
            <p className="inputTitle imgTitle">상품이미지<span className="red">*</span><small>({formImg.length + saveImg.length}/5)</small></p>
            <div className="imageInputBox">
              <span id="imageInput" className={outline[4]}>
                <input type="file" name='img' ref={inputImg} accept="image/jpg, image/jpeg, image/png" multiple onChange={(e) => {
                  handleChange(e, null)
                }} />
                <i className="xi-camera"><span>이미지 등록</span></i>
              </span>
              {imgPreview()}
              {tempPreview()}
              {thumnail.length ? thumnail.map((photo, i) =>
                <span className="previewContainer">
                  <img src={photo} className='photoPreview' />
                  <button className="imgClose" type="button" value={i} onClick={(e) => closeImg(e, 'thumnail')}><CgClose /></button>
                </span>)
                :
                null}

              <span className="notice">
                {notice[4] && <><i className="xi-ban"></i>상품 사진을 등록해주세요..</>}
              </span>
              <span className="imgExplain">상품 이미지는 PC에서는 1:1, 모바일에서는 1:1.23 비율로 보여져요.</span>
            </div>
          </div>
          <div className="inputContainer">
            <p className="inputTitle">상품명</p>
            <div className="nameInput">
              <input type="text" id="productName" className={outline[0]} name="productName" ref={inputProductName} value={form.productName} onChange={(e) => {
                handleChange(e, 0);
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
              <input type="text" value={place} disabled />
            </div>
          </div>
          <div className="inputContainer">
            <p className="inputTitle">상품상태</p>
            <div>
              <label htmlFor="newProduct" className="productRadio">
                <input id="newProduct" type="radio" name="use" />새 상품 (미사용)
                <span >사용하지 않은 새 상품</span>
              </label>
              <label htmlFor="newProduct2" className="productRadio">
                <input id="newProduct2" type="radio" name="use" />사용감 없음
                <span >사용은 했지만 눈에 띄는 흔적이나 얼룩이 없음</span>
              </label>
              <label htmlFor="newProduct3" className="productRadio">
                <input id="newProduct3" type="radio" name="use" />사용감 적음
                <span >눈에 띄는 흔적이나 얼룩이 약간 있음</span>
              </label>
              <label htmlFor="newProduct4" className="productRadio">
                <input id="newProduct4" type="radio" name="use" />사용감 많음
                <span >눈에 띄는 흔적이나 얼룩이 많이 있음</span>
              </label>
              <label htmlFor="newProduct5" className="productRadio">
                <input id="newProduct5" type="radio" name="use" /> 고장/파손 상품
                <span >기능 이상이나 외관 손상 등으로 수리/수선 필요</span>
              </label>
            </div>
          </div>

          <div className="inputContainer">
            <p className="inputTitle">교환</p>
            <div className="formRadio">
              <label htmlFor="disable" >
                <input id="disable" type="radio" name="change" defaultChecked />불가
              </label>
              <label htmlFor="ablr" >
                <input id="ablr" type="radio" name="change" />가능
              </label>
            </div>
          </div>

          <div className="inputContainer borderNone">
            <p className="inputTitle">가격</p>
            <div >
              <p className="priceInput">
                <input type="text" id="price" className={outline[1]} name="price" ref={inputPrice} value={form.price} onChange={(e) => {
                  handleChange(e, 1);
                }} maxLength='11' placeholder="가격을 입력해 주세요." />
                <span className="notice">
                  {notice[1] && <><i className="xi-ban"></i>100원 이상 입력해주세요.</>}
                </span>
              </p>
              <div className="formRadio ">
                <label htmlFor="include" className="radioPrice">
                  <input id="include" type="radio" name="deliver" checked={!deliverPrice} onChange={() => setDeliverPrice(false)} />배송비포함
                </label>
                <label htmlFor="notInclude" className="radioPrice">
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
              <textarea rows="6" maxLength='500' className={outline[3]} name="content" ref={inputContent} value={form.content} onChange={(e) => {
                handleChange(e, 3);
              }}></textarea>
              <p className="infoNotice">
                <span className="notice">
                  {notice[3] && <><i className="xi-ban"></i>상품 설명을 10글자 이상 입력해주세요.</>}
                </span>
                <span className="infoCheck">
                  {info}/500
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
            <li><button onClick={onClickSave} type="button">임시저장</button></li>
            <li><button className="submit">{props.edit ? '수정하기' : '등록하기'}</button></li>
          </ul>
        </div>
      </form>
    </>
  );
}