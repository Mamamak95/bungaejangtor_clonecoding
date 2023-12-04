import { BsChatHeartFill } from "react-icons/bs";

export default function ChatBtn({className,color,size}) {
  return (
    <button className={`btnStyle ${className}`}>
      <BsChatHeartFill color={color} size={size} />
      <span>번개톡</span>
    </button>
  );

} 