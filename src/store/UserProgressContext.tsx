import { createContext, JSX, useState } from "react";

interface UserProgressContextType {
  page: string
  section: string,
  modalType: string,
  updateCurrentPage: (page: string) => void,
  updateSection: (cat: string) => void,
  updateModalType: (type: string) => void,
}

const UserProgressContext = createContext({} as UserProgressContextType);

export function UserProgressContextProvider(props: {children: JSX.Element}) {
  const [currentPage, setCurrentPage] = useState("Overview")
  const [currentSection, setCurrentSection] = useState("");
  const [currentModal, setCurrentModal] = useState("");

  function updateCurrentPage(page: string) {
    setCurrentPage(page);
  }

  function updateSection(cat: string) {
    if (cat == currentSection) {
      setCurrentSection("");
    } else {
      setCurrentSection(cat);
    }
  }

  function updateModalType(type: string) {
    setCurrentModal(type);
  }

  const UserProgressCtx = {
    page: currentPage,
    section: currentSection,
    modalType: currentModal,
    updateCurrentPage,
    updateSection,
    updateModalType
  }

  return <UserProgressContext.Provider value={UserProgressCtx}>{props.children}</UserProgressContext.Provider>
}

export default UserProgressContext;