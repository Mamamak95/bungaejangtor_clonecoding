import { BsHeartFill } from "react-icons/bs";

export default function WishBtn({btnWish,size,addWishList}) {
  return (
    <button
    type="button"
    className={`btnStyle ${btnWish === false ? "btnWish" : "btnWishActive"}`}
    onClick={addWishList}
  >
    <BsHeartFill color={btnWish === false ? "white" : "red"} size={size} />
    <span>찜</span>
    <span></span>
  </button>
  );

} 