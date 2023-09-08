import React, { useEffect, useState } from 'react';
import {AiFillHeart} from 'react-icons/ai'
import UseAuthCheck from '../../hooks/useAuthCheck';
import { useMutation } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { useContext } from 'react';
import UserDetailContext from '../../context/UserdetailContext';
import { toFav } from '../../utils/apis/api';
import { updateFavourites } from '../../utils/common';
import { checkFavourites } from '../../utils/common';

const Heart = ({id}) => {
    const [heartColor, setHeartColor]=useState("white")
    const {user} = useAuth0()
    const {validateLogin} = UseAuthCheck()

    const {
        userDetails: {favourites}, setUserDetails,}= 
        useContext(UserDetailContext);

        useEffect(()=> {
            setHeartColor(() => checkFavourites(id, favourites))
        })
    

    const {mutate} = useMutation({
        mutationFn: () => toFav(id, user?.email),
        onSuccess: ()=> { 
            setUserDetails((prev)=>(
                {
                    ...prev,
                    favourites: updateFavourites(id, prev.favourites)
                }
            ))

        }
    })

    const handleLike = () => {
        if(validateLogin())
        {
            mutate()
            setHeartColor((prev)=> prev === "#fa3e5f" ? "white": "#fa3e5f")
        }
    }    
    
    return (
        <AiFillHeart size={24} color={heartColor} onClick={(e)=>{
            e.stopPropagation()
            handleLike()
        }} />
    );
}

export default Heart;
