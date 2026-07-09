import { useEffect } from "react";
import { setJSON, getJSON } from "../../utils/localStorageManager";

export const useLibraryFetch = ({
    fetchCall,
    user,
    priv_u,

    setSongs,
    setArtists,
    setPrivateSongs,

    setOriginalSongs,
    setOriginalArtists,
    setOriginalPrivateSongs,

    setLoading,
}) => {

    const setLibraryData = (
        songsData,
        artistsData,
        privateSongsData
    ) => {

        setSongs(songsData);
        setArtists(artistsData);
        setPrivateSongs(privateSongsData);

        setOriginalSongs(songsData);
        setOriginalArtists(artistsData);
        setOriginalPrivateSongs(privateSongsData);

    };


    useEffect(() => {

        const loadLibrary = async () => {

            try {

                const [
                    songsData,
                    artistsData
                ] = await Promise.all([
                    fetchCall("songs"),
                    fetchCall("artists"),
                ]);


                const privateSongsData = priv_u
                    ? await fetchCall("privateSongs").catch(() => [])
                    : [];


                setLibraryData(
                    songsData,
                    artistsData,
                    privateSongsData
                );


                setJSON(
                    "library/songs",
                    songsData
                );

                setJSON(
                    "library/artists",
                    artistsData
                );

                setJSON(
                    "library/private_songs",
                    privateSongsData
                );


            } catch (err) {

                console.log(err);


                const songsData = getJSON(
                    "library/songs",
                    []
                );

                const artistsData = getJSON(
                    "library/artists",
                    []
                );

                const privateSongsData = getJSON(
                    "library/private_songs",
                    []
                );


                setLibraryData(
                    songsData,
                    artistsData,
                    privateSongsData
                );


            } finally {

                setLoading(false);

            }

        };


        loadLibrary();


    }, [
        user,
        fetchCall,
        priv_u
    ]);

};