import { createContext, useState, useContext } from "react";

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);

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
