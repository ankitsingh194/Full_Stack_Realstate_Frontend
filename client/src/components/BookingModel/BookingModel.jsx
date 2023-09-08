import React, { useContext, useState } from 'react';
import {Button, Modal} from '@mantine/core'
import { DatePicker } from '@mantine/dates';
import { useMutation } from 'react-query';
import UserDetailContext from '../../../../client/src/context/UserdetailContext'
import { bookVisit } from '../../utils/apis/api';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';


const BookingModel = ({opened,setOpened,email,propertyId}) => {

    const [value , setValue] = useState(null);
    const { userDetails: {token},setUserDetails } = useContext(UserDetailContext);

    const handdleBookingSucess = ()=>{
        toast.success("Your booking is Successfull", {
            position: "bottom-right"
        });
        setUserDetails((prev)=>( {
            ...prev,
            bookings:[
                ...prev.bookings,
                {
                    id: propertyId, date: dayjs(value).format('DD/MM/YYYY')
                }
            ]
        }))
    }


    const {mutate, isLoading} = useMutation({
        mutationFn: ()=> bookVisit(value,propertyId,email),
        onSuccess: ()=>handdleBookingSucess(),
        onError: ({response}) => toast.error(response.data.message),
        onSettled: ()=> setOpened(false)
    });
    return (
        <Modal
        opened={opened}
        onClose={()=> setOpened(false)}
        title="Select your date of visit"
        centered
        >
            <div className='flexColCenter' style={{gap: "1rem"}}>
                <DatePicker  value={value} onChange={setValue} minDate={new Date() }/>
                <Button disabled={!value || isLoading} onClick={() => mutate()}>
                    Book visit
                </Button>
                
            </div>

        </Modal>
    );
}

export default BookingModel;
