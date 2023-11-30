import { BsHeartFill } from "react-icons/bs";

export default function WishBtn({btnWish,size}) {
  return (
    <button
    className={`btnStyle ${btnWish === false ? "btnWish" : "btnWishActive"}`}
  >
    <BsHeartFill color={btnWish === false ? "white" : "red"} size={size} />
    <span>찜</span>
    <span>1</span>
  </button>
  );

} 