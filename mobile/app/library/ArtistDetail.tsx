import React from "react";
import ArtistDetail from "@/components/library/details/ArtistDetail";
import TabLayoutWrapper2 from "@/components/ui/tabs/TabLayoutWrapper2";

export default function ArtistInfo(props: any) {
    return (
        <TabLayoutWrapper2 title="">
            <ArtistDetail {...props} />
        </TabLayoutWrapper2>
    );    
}