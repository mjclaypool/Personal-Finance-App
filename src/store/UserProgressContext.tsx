import { createContext, JSX, useState } from "react";

interface UserProgressContextType {
  page: string
  dropdown: string,
  modalType: string,
  updateCurrentPage: (page: string) => void,
  updateDropdown: (cat: string) => void,
  updateModalType: (type: string) => void,
}

const UserProgressContext = createContext({} as UserProgressContextType);

export function UserProgressContextProvider(props: {children: JSX.Element}) {
  const [currentPage, setCurrentPage] = useState("Overview")
  const [currentDropdown, setCurrentDropdown] = useState("");
  const [currentModal, setCurrentModal] = useState("");

  function updateCurrentPage(page: string) {
    setCurrentPage(page);
  }

  function updateDropdown(cat: string) {
    if (cat == currentDropdown) {
      setCurrentDropdown("");
    } else {
      setCurrentDropdown(cat);
    }
  }

  function updateModalType(type: string) {
    setCurrentModal(type);
  }

  const UserProgressCtx = {
    page: currentPage,
    dropdown: currentDropdown,
    modalType: currentModal,
    updateCurrentPage,
    updateDropdown,
    updateModalType
  }

  return <UserProgressContext.Provider value={UserProgressCtx}>{props.children}</UserProgressContext.Provider>
}

export default UserProgressContext;