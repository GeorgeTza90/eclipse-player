import React from "react";
import CollectionDetailComponent from '@/components/library/details/CollectionDetail';
import TabLayoutWrapper2 from "@/components/ui/tabs/TabLayoutWrapper2";

export default function CollectionDetail(props: any) {
    return (
        <TabLayoutWrapper2 title="">
            <CollectionDetailComponent {...props} />    
        </TabLayoutWrapper2>
    );  
}