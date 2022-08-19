import React, {
  createContext,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface DarkModeContextInterface {
  dark: boolean;
  setDark: React.Dispatch<SetStateAction<boolean>>;
}

const DarkMode = createContext<DarkModeContextInterface | null>(null);

export function useDarkMode() {
  return useContext(DarkMode);
}

export function DarkModeContext({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const setting: boolean =
    JSON.parse(localStorage.getItem('darkmode')!) || false;

  const [dark, setDark] = useState<boolean>(setting);
  return (
    <DarkMode.Provider value={{ dark, setDark }}>{children}</DarkMode.Provider>
  );
}
