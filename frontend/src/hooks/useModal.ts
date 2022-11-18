import { useState, useCallback } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleStateChange = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [isOpen, setIsOpen]);

  return {
    isOpen,
    handleStateChange,
  };
};

export default useModal;
