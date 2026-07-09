import { useEffect } from "react";
import { setBool } from "../../utils/localStorageManager";

export const useLibraryPersistence = (vinyl) => {

    useEffect(() => {

        setBool(
            "library_vinylMode",
            vinyl
        );

    }, [vinyl]);

};