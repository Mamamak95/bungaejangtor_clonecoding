import { useEffect, useState } from "react";

export default function ProductCategory(props) {


  const [firstCategory, setFirstCategory] = useState([]) //첫번쨰 카테고리 fetch
  const [secondCategory, setSecondCategory] = useState([]) //두번쨰 카테고리 fetch
  const [lastCategory, setLastCategory] = useState([]) //세번쨰 카테고리 fetch
  const [color, setColor] = useState(['', '', '']); // 글자색 넣기위해 value값 할당 후 클릭한 value랑 비교용
  const [active, setActive] = useState(''); // 테두리 색 변경 active

  useEffect(() => {
    fetch(`data/mainCategory.json `)
      .then((res) => res.json())
      .then(data => setFirstCategory(data))
      .catch(() => { console.log('error') });
  }, []); // 처음 페이지 로드시 첫번째 카테고리 데이터 불러옴


  let onSecondCategory = (e) => {
    setLastCategory([]) //last카테고리를 비워야 3번째 카테고리 div가 안나옴
    setActive('active') //active가 된다면 테두리색 변경
    props.onClick(true,e.target.value , e.target.textContent,0); // catagoryClick 함수에 파라미터 전송

    fetch(`data/middle/${e.target.value}.json `)
      .then((res) => res.json())
      .then(data => setSecondCategory(data))
      .catch(() => { console.log('error') });
  }

  let onLastCategory = (e) => {
    fetch(`data/last/${e.target.value}.json `)
      .then((res) => res.json())
      .then(data => {
        setLastCategory(data)
        if (data.length === 0) {
          setActive('') //last 카테고리가 없다면 테두리색 없앰
          props.onClick(false,e.target.value,e.target.textContent,1); //last 카테고리가 없다면 상세 카테고리를 선택해주세요. 멘트 없애기 위해 false
        } else {
          setActive('active') //last 카테고리가 있다면 테두리색 필요
          props.onClick(true,e.target.value,e.target.textContent,1); //last 카테고리가 있다면 상세 카테고리를 선택해주세요. 멘트 없애기 위해 true

        }

      })
      .catch(() => { console.log('error') });
  }

  let handleClick = (e, i) => {
    let copy = [...color]
    copy[i] = e.target.value
    setColor(copy)
  }

  return (
    <div className={`${props.class} ${active}`}>

      <div>
        {firstCategory.map((v, i) =>
          <button value={v.value} className={color[0] === v.value ? 'on' : ''} type="button" key={i} //value 값과 setColor로 바꾼 tartget value가 같다면 on class부착
            onClick={(e) => {
              handleClick(e, 0 ) // 눌렀을떄 color를 value로 변경
              onSecondCategory(e) // 눌렀을떄 e.target.value 값을 파라미터로 두번째 카테고리 호출
            }}>{v.main} 
          </button>)}
      </div> 

      <div>
        {secondCategory.length === 0 ? <p className="categoryNon">중분류 선택</p> : //secondCategory 데이터의 유 무에 따라 노출되는 태그 변경
          secondCategory.map((v, i) =>
            <button value={v.middleValue} className={color[1] === v.middleValue ? 'on' : ''} type="button" key={i}
              onClick={(e) => {
                handleClick(e, 1)
                onLastCategory(e)
              }}>{v.middle}
            </button>)}
      </div>

      <div>
        {lastCategory.length === 0 ? <p className="categoryNon">소분류 선택</p> :  //lastCategory 데이터의 유 무에 따라 노출되는 태그 변경
          lastCategory.map((v, i) =>
            <button value={v.lastValue} className={color[2] === v.lastValue ? 'on' : ''} type="button" key={i}
              onClick={(e) => {
                handleClick(e, 2)
                setActive('') // 테두리 색 없앰
                props.onClick(false,e.target.value,e.target.textContent,2); // catagoryClick 함수에 파라미터 전송
              }}>{v.last}
            </button>)}
      </div>

    </div>
  );
}