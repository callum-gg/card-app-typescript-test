import React from "react";

interface SettingsDialogProps {
  setSettingsOpen: (isOpen: boolean) => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ setSettingsOpen }) => {
  const updateDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  const closeSettings = () => {
    setSettingsOpen(false);
  };

  return (
    <div className="flex items-center justify-center fixed top-0 h-screen w-screen bg-black bg-opacity-60">
      <div className="flex flex-col gap-5 p-5 rounded-md bg-gray-300 dark:bg-gray-700">
        <div className="text-xl">Settings</div>
        <label className="inline-flex gap-3 items-center cursor-pointer">
          <input
            onChange={updateDarkMode}
            type="checkbox"
            value=""
            defaultChecked={document.documentElement.classList.contains("dark")}
            className="sr-only peer"
          ></input>
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none ring-1 ring-gray-800 dark:ring-gray-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-400 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span>Toggle Dark Mode</span>
        </label>
        <button
          onClick={closeSettings}
          className="m-3 px-4 py-2 bg-blue-400 dark:bg-blue-700 hover:bg-blue-500 dark:hover:bg-blue-800 rounded-md text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SettingsDialog;
