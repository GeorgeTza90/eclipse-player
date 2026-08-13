import React from "react";
import PlaylistDetailComponent from '@/components/library/details/PlaylistDetail';
import TabLayoutWrapper2 from "@/components/ui/tabs/TabLayoutWrapper2";

export default function PlaylistDetail(props: any) {
    return (
        <TabLayoutWrapper2 title="">
            <PlaylistDetailComponent {...props} />  
        </TabLayoutWrapper2>
    );  
}
