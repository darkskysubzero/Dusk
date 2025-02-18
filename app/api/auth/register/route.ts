import { connectToDb } from "@/lib/helpers";
import prisma from "@/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"; 

export const POST = async (req: Request)=>{
    const {name, email, password} = await req.json();

    // If invalid name/email/password
    if(!name || !email || !password){
        return NextResponse.json({message:"Invalid Data"}, {status: 422})
    }

    // If valid
    try{
        await connectToDb();
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            }
        });

        return NextResponse.json({
            message:"User Registered!", 
            ...user
        }, {status: 201})

    }catch(error:any){
        return NextResponse.json({
            message:"Server Error", 
            ...error
        }, {status: 500})
    }finally{
        // Disconnect app from database
        await prisma.$disconnect();
    }
};