import { BsChatHeartFill } from "react-icons/bs";

export default function ChatBtn(props) {
  return (
    <button className={`btnStyle ${props.className}`} onClick={props.chatClick}>
      <BsChatHeartFill color={props.color} size={props.size} />
      <span>번개톡</span>
    </button>
  );

} 