import React from "react";
import PrivateCollectionDetail from "@/components/library/details/PrivateCollectionDetail";
import TabLayoutWrapper2 from "@/components/ui/tabs/TabLayoutWrapper2";

export default function CollectionDetail(props: any) {
    return (
        <TabLayoutWrapper2 title="">
            <PrivateCollectionDetail {...props} />  
        </TabLayoutWrapper2>
    );  
}