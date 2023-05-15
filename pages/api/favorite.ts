import { NextApiRequest,NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { without } from "lodash";

const handler = async (req:NextApiRequest,res:NextApiResponse) => {
    try {
        if (req.method === 'POST') {
            const { currentUser } = await serverAuth(req, res);


            const { movieId } = req.body;



            const existingMovie = await prisma.movie.findUnique({
              where: {
                id: movieId
              }
            });

            if (!existingMovie) {
              throw new Error('Invalid ID');
            }

            const user = await prisma.user.update({
              where: {
                email: currentUser.email || '',
              },
              data: {
                favoriteIds: {
                  push: movieId
                }
              }
            });

            return res.status(200).json(user);
          }

        if(req.method ==="DELETE"){
            const {currentUser} = await serverAuth(req,res);
            const {movieId} = req.query;
            const existingMovie = await prisma.movie.findUnique({
                where:{id:movieId as string}
            });
            if(!existingMovie){
                throw new Error('invalid ID');
            }
            const updatedFavoriteIds = without(currentUser.favoriteIds,movieId);

            const updatedUser = await prisma.user.update({
                where:{
                    email:currentUser.email || '',
                },
                data:{
                    favoriteIds:updatedFavoriteIds as string[]
                }
            });
            return res.status(200).json(updatedUser);
        }
        return res.status(405).end();
    } catch (err) {
        console.log(err);
        return res.status(400).end()

    }

}

export default handler;