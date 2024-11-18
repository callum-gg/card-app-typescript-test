import { ChangeEvent, MouseEvent, useContext, useState } from "react";
import { Entry, EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

export default function NewEntry() {
  const emptyEntry: Entry = { title: "", description: "", created_at: new Date(), scheduled: new Date() };
  const { saveEntry } = useContext(EntryContext) as EntryContextType;
  const [newEntry, setNewEntry] = useState<Entry>(emptyEntry);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewEntry({
      ...newEntry,
      [event.target.name]: event.target.value,
    });
  };
  const handleSend = (e: MouseEvent<HTMLButtonElement>) => {
    saveEntry(newEntry);
    setNewEntry(emptyEntry);
  };
  return (
    <section className="flex justify-center flex-col w-fit ml-auto mr-auto mt-10 gap-5 bg-gray-300 dark:bg-gray-700 p-8 rounded-md">
      <input
        className="p-3 rounded-md dark:bg-gray-800"
        type="text"
        placeholder="Title"
        name="title"
        value={newEntry.title}
        onChange={handleInputChange}
      />
      <textarea
        className="p-3 rounded-md dark:bg-gray-800"
        placeholder="Description"
        name="description"
        value={newEntry.description}
        onChange={handleInputChange}
      />
      <section className="flex flex-col gap-1">
        <p>Created At</p>
        <input
          className="p-3 rounded-md dark:bg-gray-800"
          type="date"
          name="created_at"
          value={new Date(newEntry.created_at).toISOString().split("T")[0]}
          onChange={handleInputChange}
        />
      </section>
      <section className="flex flex-col gap-1">
        <p>Scheduled For</p>
        <input
          className="p-3 rounded-md dark:bg-gray-800"
          type="date"
          name="scheduled"
          value={new Date(newEntry.scheduled).toISOString().split("T")[0]}
          onChange={handleInputChange}
        />
      </section>
      <button
        onClick={(e) => {
          handleSend(e);
        }}
        className="bg-blue-400 dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-800 font-semibold text-white p-3 rounded-md"
      >
        Create
      </button>
    </section>
  );
}
