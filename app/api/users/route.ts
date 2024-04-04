import { connectToDb, generateErrorMessage, generateSuccessMessage } from "@/lib/helpers"
import prisma from "@/prisma"; 

export const GET = async ()=>{
    try{
        await connectToDb();
        const users = await prisma.user.findMany();
        return generateSuccessMessage({users}, 200);
    }catch (error){
        return generateErrorMessage({error}, 500);
    }finally{
        await prisma.$disconnect();
    }
}