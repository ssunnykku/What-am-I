import { useEffect, useState, useRef } from 'react';

//TODO 현재는 any로 해놨는데 타입추론을 하는 방법이 궁금하다

const useDetectClose = (initialState: any) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const ref = useRef<any>(null);

  const removeHandler = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const onClick = (e: any) => {
      if (ref.current !== null && !ref.current.contains(e.target)) {
        setIsOpen(!isOpen);
      }
    };

    if (isOpen) {
      window.addEventListener('click', onClick);
    }

    return () => {
      window.removeEventListener('click', onClick);
    };
  }, [isOpen]);

  return [isOpen, ref, removeHandler];
};

export default useDetectClose;
