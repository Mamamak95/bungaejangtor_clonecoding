import RegisterForm from "../component/RegisterForm/RegisterForm";
import { getUser } from "../util/localStorage";
import NotFound from './NotFound';

export default function ProductRegister() {
  const userInfo = getUser() ? getUser() : '';



  return (

    <>
      {userInfo.uid ?
        <RegisterForm/>
        :
        <NotFound />}

    </>
  );
}