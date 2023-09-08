import React from 'react';
import { useQuery } from 'react-query';
import { getAllProperties } from '../utils/apis/api';

const UsePropertys = () => {

    const {data , isLoading , isError , refetch} = useQuery(
        "allProperties"
        ,getAllProperties, 
        {refetchOnWindowFocus:false}
    );
    return {
        data , isError, isLoading , refetch
    }
    
}

export default UsePropertys;
