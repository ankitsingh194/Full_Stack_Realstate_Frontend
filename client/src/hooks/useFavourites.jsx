import React, { useContext } from 'react';
import UserDetailContext from '../context/UserdetailContext';
import { useQuery } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { getAllFav } from '../utils/apis/api';
import { useRef } from 'react';
import { useEffect } from 'react';

const useFavourites = () => {

    const {userDetails, setUserDetails} = useContext(UserDetailContext);
    const querRef = useRef()
    const {user} = useAuth0()

    const {data, isLoading , isError , refetch} = useQuery({
        queryKey: "allFavourites",
        queryFn:()=> getAllFav(user?.email),
        onSuccess: (data)=> setUserDetails((prev)=> ({...prev, favourites: data})),
        enabled: user!==undefined,
        staleTime:30000
    });

    querRef.current = refetch;

    useEffect(()=>{
        querRef.current && querRef.current()
    } )




    return {data, isError , isLoading, refetch };
};

export default useFavourites;
