// dialogContext.tsx
import React, { createContext, useState } from 'react';

interface DialogContextProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DialogContext = createContext<DialogContextProps>({
  isOpen: false,
  setIsOpen: () => {},
});

export const DialogProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DialogContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DialogContext.Provider>
  );
};