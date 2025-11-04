import { createContext, useState, useContext } from "react";

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [songs, setSongs] = useState(() => {
    const saved = localStorage.getItem("library/songs");
    return saved ? JSON.parse(saved) : [];
  });

  const [artists, setArtists] = useState(() => {
    const saved = localStorage.getItem("library/artists");
    return saved ? JSON.parse(saved) : [];
  });

  return (
    <LibraryContext.Provider value={{ songs, setSongs, artists, setArtists }}>
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
