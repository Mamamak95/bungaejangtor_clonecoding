import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SubBar from './SubBar';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <SubBar pathname={pathname.includes('productDetail') ? pathname : false} />
};

export default ScrollToTop;