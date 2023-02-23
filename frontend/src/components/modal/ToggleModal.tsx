import { useState } from 'react';
import styled from 'styled-components';
import { font } from '../../assets/styles/common/fonts';
import { MyModalProps } from './MyModal';

const ToggleModal = ({
  isOpen,
  onModalStateChangeEvent,
  children,
}: MyModalProps) => {
  return (
    <ToggleModalBox isOpen={isOpen} onClick={onModalStateChangeEvent}>
      {/* <ToggleModalContainer onClick={(e) => e.stopPropagation()}> */}
      {children}
      {/* </ToggleModalContainer> */}
    </ToggleModalBox>
  );
};

export default ToggleModal;

const ToggleModalBox = styled.div<{ isOpen: boolean }>`
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  ${(props) => (props.isOpen ? 'display: block' : 'display: none')};
`;

const ToggleModalContainer = styled.div`
  /* top: 5%;
  left: 59%;
  position: absolute; */
`;
