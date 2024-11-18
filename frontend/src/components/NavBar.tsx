import { MouseEvent, useState } from "react";
import { NavLink } from "react-router-dom";
import SettingsDialog from "./Settings";

export default function NavBar() {
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const openSettings = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSettingsOpen(true);
  };

  return (
    <>
      <nav className="flex justify-center gap-5">
        <NavLink
          className="m-3 p-4 text-xl bg-blue-400 dark:bg-blue-700 hover:bg-blue-500 dark:hover:bg-blue-800 rounded-md font-medium text-white"
          to={"/"}
        >
          All Entries
        </NavLink>
        <NavLink
          className="m-3 p-4 text-xl bg-blue-400 dark:bg-blue-700 hover:bg-blue-500 dark:hover:bg-blue-800 rounded-md font-medium text-white"
          to={"/create"}
        >
          New Entry
        </NavLink>
        <button
          onClick={(e) => {
            openSettings(e);
          }}
          className="m-3 p-4 text-xl bg-blue-400 dark:bg-blue-700 hover:bg-blue-500 dark:hover:bg-blue-800 rounded-md font-medium text-white"
        >
          ⚙️
        </button>
      </nav>
      {isSettingsOpen && <SettingsDialog setSettingsOpen={setSettingsOpen} />}
    </>
  );
}
