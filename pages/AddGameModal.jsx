import { useAtom } from 'jotai';
import styled from 'styled-components'
import React, {memo,} from 'react'
import { addGameModalToggleAtom } from '../state/state'
import ModalContents from './ModalContents'
import Link from 'next/link'

const ModalWrap = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalPopup = styled.div`
  width: ${props => props.mobile ? "290px" : "660px"};
  height:${props => props.mobile ? "414px" : "500px"};
  background: #fff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  padding: 24px;
  display: flex;

  
  flex-direction: column;
`;
const CloseModal = styled.div`
  width: 20px;
  height:20px;
  background: #000;
`;
const ModalContentsWrap = styled.div`
  display: flex;
  align-items: left;
  justify-content: center;
  flex-direction: column;
  flex: 1;
`;
const ModalHeader = styled.div`
  display: flex;
`;

const DropdownSelect = styled.select`
  width: 100%;
  height: 40px;

`;

const AddGameModal = () => {
  const [addGameToggle, setToggle] = useAtom(addGameModalToggleAtom);
  const clicked = () => {
    return (
      <Link href="/about"></Link>
    );
  }
  return(
    <ModalWrap>
      {/* <ModalPopup mobile={screen === 'MOBILE' ? 'mobile' : null}> */}
      <ModalPopup>
        <ModalHeader>
          <CloseModal onClick={() => {setToggle(!addGameToggle)}}/>
        </ModalHeader>
        <ModalContentsWrap>
          <ModalContents/>
          {/* <ModalContents roundOf={roundOf} url={url}/> */}
          
        </ModalContentsWrap>
      </ModalPopup>
    </ModalWrap>
  );
}

export default memo(AddGameModal);