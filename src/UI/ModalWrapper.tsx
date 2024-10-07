import { JSX, useEffect, useRef } from "react";
import { createPortal } from 'react-dom';

import SectionWrapper from './SectionWrapper';

const ModalWrapper = (props: {openModal: boolean, closeModal: () => void, children: JSX.Element}) => {
  const dialog: any = useRef();

  useEffect(() => {
    if (props.openModal) {
      dialog.current?.showModal();
    } else {
      dialog.current?.close();
    }
  }, [props.openModal]);

  return createPortal(
    <>
      <dialog
        className="fixed top-0 flex justify-center items-center font-pubSans bg-p-grey900 bg-opacity-20 w-full max-w-[100vw] h-full max-h-[100vh] px-200"
        ref={dialog}
        onCancel={props.closeModal}
      >
        <div className="w-full max-w-[560px]">
          <SectionWrapper color="white">
            <div className="flex flex-col gap-5">
              {props.children}
            </div>
          </SectionWrapper>
        </div>
      </dialog>
    </>,
    document.getElementById('modal')!
  )
}

export default ModalWrapper;