import { NextApiRequest,NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

const handler = async (req:NextApiRequest,res:NextApiResponse)=>{
    if(req.method !== "GET"){
        return res.status(405).end();
    }
    try {
        const movie = await prisma.movie.findMany();
        return res.status(200).json(movie);
    } catch (err) {
        console.log(err);
        return res.status(400).end();

    }
}

export default handler