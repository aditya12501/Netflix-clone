import axios from "axios";
import React, { useCallback,useMemo } from 'react';
import { AiOutlinePlus,AiOutlineCheck } from "react-icons/ai";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";

interface FavoriteButtonProps {
    movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({movieId}) => {
    const {mutate:favoritesMutate} = useFavorites();
    const {data:currentUser,mutate} = useCurrentUser();

    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(movieId);
    },[movieId,currentUser]);

    const toggleFavorites = useCallback(async ()=>{
        let response;
        console.log(isFavorite);

        if(isFavorite){


            response = await axios.delete(`/api/favorite?movieId=${movieId}`);
        }else{
            response = await axios.post(`/api/favorite`,{movieId});
        }

        const updatedFavoriteIds = response?.data?.favoriteIds;

        mutate({...currentUser,favoriteIds:updatedFavoriteIds});
        favoritesMutate();

    },[movieId,currentUser,isFavorite,mutate,favoritesMutate]);

    const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

    return (
        <div
        onClick={toggleFavorites}
         className="
        cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300
        " >
            <Icon size={25} className="text-white hover:text-neutral-300"  />
        </div>
    )
}
export default FavoriteButton;