import React from 'react'

/**
 * 
 * @param {string} className span className 
 * @param {string} url image path - ex. /productImage/image.jpg
 * @returns <span className={className}><img src={http://127.0.0.1:8000/url}/><span>
 */
export default function Image({className,url}){
  const imgUrl=url===''?'https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg':`http://127.0.0.1:8000/${url}`
  return(
<span className={className}>
  <img  src={imgUrl} />
</span>
  )
}