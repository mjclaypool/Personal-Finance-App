import { JSX } from "react";
import { createPortal } from 'react-dom';

import SectionWrapper from './SectionWrapper';

const ModalWrapper = (props: {children: JSX.Element}) => {
  return createPortal(
    <>
      <dialog
        className="fixed top-0 flex justify-center items-center font-pubSans bg-p-grey900 bg-opacity-20 w-full h-full px-200"
        open
      >
        <div className="w-full max-w-[560px]">
          <SectionWrapper color="white">
            {props.children}
          </SectionWrapper>
        </div>
      </dialog>
    </>,
    document.getElementById('modal')!
  )
}

export default ModalWrapper;