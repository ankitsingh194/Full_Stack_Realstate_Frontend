import { useForm } from '@mantine/form';
import React from 'react';
import { validateString } from '../../utils/common';
import { Group, Select, TextInput } from '@mantine/core';
import useCountries from '../../hooks/useCountry';
import  Map  from '../map/Map';

const AddLocation = ({propertyDetails, setPropertyDetails, nextStep}) => {

    const {getAll} = useCountries()

    const form = useForm({
        initialValues: {
            country: propertyDetails?.country,
            city: propertyDetails?.city,
            address : propertyDetails?.address
        },

        validate: {
            country: (value)=> validateString(value),
            city: (value)=> validateString(value),
            address: (value)=> validateString(value),
        }
    })

    const {country, city,address}= form.values;
    const handleSubmit = () =>  {
        const {hasError} = form.validate()
        if(!hasError){
            setPropertyDetails((prev)=> ({...prev,city,address,country}))
            nextStep();
        }
    }
    return (
        <form onSubmit={(e)=> {
            e.preventDefault();
            handleSubmit()
        }}>
            
            <div className='flexCenter' 
            style={{
                justifyContent:"space-between",
                gap: "3rem",
                marginTop:"3rem",
                flexDirection:"row"
            }}>
            <div className='flexColStart'>
                <Select 
                w={"100%"}
                withAsterisk
                label="Country"
                clearable
                searchable
                data={getAll()}
                {
                    ...form.getInputProps("country", {type: "input"})
                }
                
                />

                <TextInput 
                w={"100%"}
                withAsterisk
                label="City"
                {
                    ...form.getInputProps("city", {type: "input"})
                }
                />
                
                <TextInput 
                w={"100%"}
                withAsterisk
                label="address"
                {
                    ...form.getInputProps("address", {type: "input"})
                }
                
                />



            </div>

            
            {/* right side */}
            <div style={{flex: 1}}>
            <Map
            address={address}
            city={city}
            country={country}/>

            </div>

            </div>

            <Group  position="center" st={"xl"} >
                <button className="button" type='submit'style={{marginTop: "20px"}}>Next Step</button>
            </Group>




        </form>
    );
}

export default AddLocation;
