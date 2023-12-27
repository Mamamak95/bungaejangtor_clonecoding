import { FaUserPlus } from "react-icons/fa6";

export default function Follow({ className,size,color }) {
  return (
    <button
      className={className}
      type="button"
    >
      <FaUserPlus color={color} size={size}/>
      팔로우
    </button>
  );

} 