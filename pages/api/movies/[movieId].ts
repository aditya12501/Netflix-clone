import { NextApiRequest,NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";


export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    if(req.method !== "GET") {
        return res.status(405).end();
    }

    try {
        await serverAuth(req,res);
        const {movieId} = req.query;
        if(!movieId || typeof movieId !== 'string'){
            throw new Error('INVALID ID');
        }
        const movie = await prisma.movie.findUnique({
            where:{
                id:movieId
            }
        });

        if(!movieId){
            throw new Error('Could not able to find movie');
        }

        return res.status(200).json(movie);
    } catch (err) {
        console.log(err);
        return res.status(400).end();

    }
}