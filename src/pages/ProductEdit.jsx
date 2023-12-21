import { useEffect, useState } from "react";
import RegisterForm from "../component/RegisterForm/RegisterForm";
import NotFound from './NotFound';
import axios from "axios";
import { useParams } from "react-router";
import { getUser } from "../util/localStorage";

export default function ProductEdit() {
  let { pid } = useParams();
  const userInfo = getUser() ? getUser() : '';
  const [data,setData] = useState();
  const [images,setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.50.57:8000/edit/${pid}`);
        setData(response.data.data);
        setImages(response.data.image)
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);


  return (

    <>
      {data && userInfo.uid === data?.seller  ?
        <RegisterForm data={data} images={images} edit={true}/>
        :
        <NotFound />}

    </>
  );
}