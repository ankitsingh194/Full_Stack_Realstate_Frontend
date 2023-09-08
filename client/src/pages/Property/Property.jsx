import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { getProperty } from '../../utils/apis/api';
import { PuffLoader } from 'react-spinners';
import { AiFillHeart, AiTwotoneCar } from 'react-icons/ai';
import './Property.css'
import { MdLocationPin, MdMeetingRoom } from 'react-icons/md';
import {FaShower} from "react-icons/fa"
import Map from '../../components/map/Map'
import UseAuthCheck from '../../hooks/useAuthCheck';
import { useAuth0 } from '@auth0/auth0-react';
import BookingModel from '../../components/BookingModel/BookingModel';
import UserDetailContext from '../../context/UserdetailContext';
import { useContext } from 'react';
import { Button } from '@mantine/core';
import { toast } from 'react-toastify';
import { removeBooking } from '../../utils/apis/api';
import Heart from '../../components/Heart/Heart';


const Property = () => {
    const {pathname} = useLocation()
    const id = pathname.split("/").slice(-1)[0]
    
    const {data, isLoading, isError} = useQuery(["read", id], () => getProperty(id))
    const [modalOpened, setModelOpened] = useState(false);
    const {validateLogin} = UseAuthCheck();
    const {user} = useAuth0()
    const { userDetails:{ bookings } ,setUserDetails } = useContext(UserDetailContext);
    
    const {mutate: cancelBooking, isLoading: cancelling}= useMutation({
        mutationFn: ()=> removeBooking(id, user?.email),
        onSuccess: ()=> {
            setUserDetails((prev)=> ({
                ...prev,
                bookings: prev.bookings.filter((bookings)=> bookings?.id !== id)
                

            }))
            toast.success("Booking cancelled",{position: 'bottom-right'});
        }
    })

    if(isLoading)
    { return (
        <div className='wrapper'>
            <div className='flexCenter paddings'>
                <PuffLoader />

            </div>
            
        </div>
    )}
    if(isError)
    { return (
        <div className='wrapper'>
            <div className='flexCenter paddings'>
                <span>Error while fetching the preoperty details</span>

            </div>
            
        </div>
    );
}


    
 return (
        <div className='wrapper'>
            <div className='flexCenter paddings innerWidth property-container'>
                {/* Like buttom*/}
                <div className='Like'>
                    <Heart  id={id}/>
        

                </div>
                {/* image*/}
                <img src={data?.image} alt='home image'/>


                <div className='flexCenter property-details'>
                    {/*left */}
                    <div className='flexColStart left'>
                        {/*Head*/}
                     <div className='flexStart head'>
                        <span className='primaryText'>{data?.title}</span>
                        </div>  
                        <div className='flexStart head'>
                        <span className='orangeText' style={{fontSize:'1.5rem'}}>$ {data?.price}</span>
                        </div> 

                        {/* facilites*/}
                        <div className='flexStart facilites'>
                            <div className='flexStart facility'>
                                <FaShower size={20} color="#1F3E72" />
                                <span>{data?.facilities?.bathrooms} Bathrooms</span> 
                            </div>
                            <div className='flexStart facility'>
                                <AiTwotoneCar size={20} color='#1F3E72' />
                                <span>{data?.facilities?.parkings} Parkings</span> 

                            </div>
                            <div className='flexStart facility'>
                                <MdMeetingRoom size={20} color='#1F3E72' />
                            <span>{data?.facilities?.bedrooms} rooms</span> 
                                 </div>

                            
                            </div> 

                        {/* description*/}
                        <span className='secondaryText' style={{textAlign: "justify"}}>
                                {data?.description}
                            </span>     

                            <div className='flexStart ' style={{gap: "1rem"}}>
                                <MdLocationPin size={25} />
                                <span className='secondaryText'>
                                    {data?.address}{", "}
                                    {data?.city} {" ,"}
                                    { data?.country }{" "}
                                </span>
                            </div> 
                            {/* booking button */}
                            { bookings?.map((booking)=>booking.id).includes(id) ? (
                            <>
                            <Button variant='outline'w={"100%"} color='red' onClick={()=> cancelBooking()} disabled={cancelling}>
                                <span>Cancle booking</span>
                            </Button>
                            <span color='green'>
                            Your visit already booked for date {bookings?.filter((bookings)=> bookings?.id === id)[0].date}

                            </span>

                            </>

                             ) : (


                            <button className='button'
                            onClick={()=> {
                                validateLogin() && setModelOpened(true)
                            }}>Book your visit 
                            </button>   

                            )}

                            <BookingModel
                             opened={modalOpened} 
                             setOpened={setModelOpened}
                             propertyId = {id}
                             email = {user?.email}
                            />

                            

                    </div>
                    <div className='map'>

                        <Map
                            address={data?.address} 
                            city={data?.city}
                            country={data?.country}
                            />
                    </div>
                </div>
                

            </div>
            
        </div>
    );
}


export default Property;
