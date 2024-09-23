
import { createContext, useState } from 'react';

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(<></>);
  const [modalTitle, setModalTitle] = useState('');

  return (
    <ModalContext.Provider value={{
      isModalOpen,
      setIsModalOpen,
      modalContent,
      setModalContent,
      modalTitle,
      setModalTitle,
    }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalProvider, ModalContext };