import React from 'react'

/**
 * 
 * @param {string} className span className 
 * @param {string} url image path - ex. /productImage/image.jpg
 * @returns <span className={className}><img src={http://127.0.0.1:8000/url}/><span>
 */
export default function Image({className,url}){
  return(
<span className={className}>
  <img  src={`http://127.0.0.1:8000/userImage${url}`} width={100}/>
</span>
  )
}