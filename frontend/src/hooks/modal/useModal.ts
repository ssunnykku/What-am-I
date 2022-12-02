import { useState, useCallback } from 'react';

type UseModalType = [isOpen: boolean, handleStateChange: () => void];

const useModal = (): UseModalType => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleStateChange = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  return [isOpen, handleStateChange];
};

export default useModal;
