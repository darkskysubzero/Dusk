import { connectToDb, generateErrorMessage, generateSuccessMessage } from "@/lib/helpers"
import prisma from "@/prisma"; 
import {v2, UploadApiResponse} from "cloudinary";


async function  uploadImage(file:Blob){

    return new Promise<UploadApiResponse>(async (resolve, reject)=>{

        // Convert file to buffer (a temp data storage)
        const buffer = Buffer.from(await file.arrayBuffer());

        v2.uploader.upload_stream({
            resource_type: "auto",
            folder: "dusk-blog"
        }, (err, result)=>{
            if(err){
                console.log(err);
                reject(err);
            }else if(result){
                resolve(result);
            }
        }).end(buffer);
    })

    
}

export const GET = async ()=>{
    try{
        await connectToDb();
        const posts = await prisma.post.findMany();
        return generateSuccessMessage({posts}, 200);
    }catch (error){
        return generateErrorMessage({error}, 500);
    }finally{
        await prisma.$disconnect();
    }
}

export const POST = async (req:Request)=>{

    // Configuring cloudinary
    v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        api_key: process.env.CLOUDINARY_API_KEY
    })


    try{
      
        // Get Form Data
        const formData = await req.formData();
        const {title, description, location, userId, categoryId} = JSON.parse(formData.get("postData") as string);

        // Validation
        if(!title || !userId || !description || !location|| !categoryId){
            return generateErrorMessage({reason: "Invalid Data!"}, 422);
        }

        // Image file as blob or null
        const file = formData.get("image") as Blob | null;

        
        // Uplaod image to Cloudinary
        let uploadedFile : UploadApiResponse | null = null;
        if(file){
            uploadedFile = await uploadImage(file);
        }else{
            uploadedFile = null;
        }

        // Making sure user and category exists in database
        await connectToDb();
        const user = await prisma.user.findFirst({where: {id: userId}});
        const category = await prisma.category.findFirst({where: {id: categoryId}});

        // Validation 
        if(!user || !category){
            return generateErrorMessage({reason: "Invalid User or Category Id!"}, 401);
        }

        // Create and save to db
        const post = await prisma.post.create({
            data: {
                title,
                description,
                location,
                categoryId,
                userId,
                imageUrl: uploadedFile?.url ?? null,
            }
        })

        return generateSuccessMessage({post}, 201)

    }catch (error){
        return generateErrorMessage({error}, 500);
    }finally{
        await prisma.$disconnect();
    }
}