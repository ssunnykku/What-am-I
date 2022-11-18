import styled from 'styled-components';
import { CommonComponentType } from '../../types/commonComponentType';

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
      <MyModalWrapper>
        {children}
        <button onClick={onModalStateChangeEvent}>Cancel</button>
      </MyModalWrapper>
    </MyModalBackdrop>
  );
};

const MyModalBackdrop = styled.div<{ isOpen: boolean }>`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.1);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  ${(props) => (props.isOpen ? 'display: block' : 'display: none')};
`;

const MyModalWrapper = styled.div`
  width: auto;
  height: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 1rem;
  text-align: center;
  tranform: translate(-50%, -50%);
  bakcground-color: white;
`;

export default MyModal;
