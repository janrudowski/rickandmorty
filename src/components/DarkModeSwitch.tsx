import React from 'react';

import { FiSun, FiMoon } from 'react-icons/fi';
import { useDarkMode } from '../contexts/DarkModeContext';

export default function DarkModeSwitch(): JSX.Element {
  const { dark, setDark } = useDarkMode()!;

  function toggleDarkMode(): void {
    setDark((prev) => !prev);
    localStorage.setItem('darkmode', JSON.stringify(!dark));
  }

  return (
    <div className='darkmode-switch'>
      <FiSun className={`darkmode-switch-icon ${dark ? '' : 'active'}`} />
      <div className='darkmode-switch-switch' onClick={toggleDarkMode}>
        <div className={`circle ${dark ? 'dark' : ''}`}></div>
      </div>
      <FiMoon className={`darkmode-switch-icon ${dark ? 'active' : ''}`} />
    </div>
  );
}
