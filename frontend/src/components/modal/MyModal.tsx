import styled from 'styled-components';
import { CommonComponentType } from '../../types/common/commonComponentType';
import { font } from '../../assets/styles/common/fonts';

interface MyModalProps extends CommonComponentType {
  isOpen: boolean;
  onModalStateChangeEvent: () => void;
}

const MyModal = ({
  isOpen,
  onModalStateChangeEvent,
  children,
}: MyModalProps) => {
  return (
    <MyModalBackdrop isOpen={isOpen}>
      {children}
      <CloseButton onClick={onModalStateChangeEvent}>X</CloseButton>
    </MyModalBackdrop>
  );
};

const MyModalBackdrop = styled.div<{ isOpen: boolean }>`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  ${(props) => (props.isOpen ? 'display: block' : 'display: none')};
`;

const CloseButton = styled.button`
  float: right;
  border: none;
  background: none;
  margin: 2.5rem 3rem;
  height: 3rem;
  width: 3.5rem;
  font-size: 2.5rem;
  color: white;
  cursor: pointer;
  font-family: ${font.bold};
`;

export default MyModal;
