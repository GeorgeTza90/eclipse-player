import { createContext, useState, useContext } from "react";

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [songs, setSongs] = useState(() => {
    const saved = localStorage.getItem("library");
    return saved ? JSON.parse(saved) : [];
  });

  return (
    <LibraryContext.Provider value={{ songs, setSongs }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error("useLibrary must be used within a LibraryProvider");
  }
  return context;
};
