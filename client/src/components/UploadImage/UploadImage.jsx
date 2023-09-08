import React, { useEffect, useRef, useState } from 'react';
import {AiOutlineCloudUpload} from "react-icons/ai"
import "./Uploadimage.css"
import { Group, Button } from '@mantine/core';

const UploadImage = ({propertyDetails, setPropertyDetails , nextStep, prevStep}) => {
     const [imageUrl , setImageUrl] = useState(propertyDetails.image);
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const handleNext =() =>{
        setPropertyDetails((prev)=> ({...prev, image: imageUrl}))
        nextStep();
    }

    useEffect(()=>{
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName:"doclpaoy7",
                uploadPreset: "azxgqmq5",
                maxFiles:1

            },
            (err, result) =>{
                if(result.event === "success"){
                    setImageUrl(result.info.secure_url)
                }
            }
        )
    },[])
    
    return (
        <div className='flexColCenter uploadWrapper'>
            {
                !imageUrl ? (
                    <div className='flexColCenter uploadZone'
                    onClick={()=> widgetRef.current?.open()}>
                        <AiOutlineCloudUpload size={50} color="grey" />
                        <span>Upload Image</span>
                    </div>
                ):(
                    <div className='uploadedImage'
                    onClick={()=> widgetRef.current?.open()}>
                        <img src={imageUrl} alt='home' />
                        </div>
                )
            } 
            <Group position="center" st={"xl"}>
                <Button variant='default' onClick={prevStep}>Back</Button>
                <Button  onClick={handleNext} disabled={!imageUrl}>Next</Button>
            </Group>
    
        
        </div>
    );
}

export default UploadImage;
