import React, { useState } from 'react';
import Searchbar from '../../components/Searchbar/Searchbar'
import './Properties.css'
import UsePropertys from '../../hooks/usePropertys';
import { PuffLoader }from 'react-spinners';
import Propertycard from '../../components/PropertyCard/Propertycard';


const Properties = () => {


    const {data, isError, isLoading} = UsePropertys()
    const [filter ,setFilter] = useState("");

    if(isError){
        return(
        <div className='wrapper'>
            <span>Error while fetching data</span>
        </div>
        )
    }
    if(isLoading){
        return(
            <div className="wrapper flexCenter" style={{height: "60vh"}}>
              <PuffLoader 
              height="80" 
              width="80"
              radius={1}
              color="#4066ff"
              aria-label="puff-loading"
              />   
            </div>
        )
    }


    return (
        <div className='wrapper'>
         
            <div className='flexColCenter padding innerWidth
             properties-container'>
                <Searchbar filter={filter} setFilter={setFilter}/>
                <div className='paddings flexCenter properties'>
                    {
                  //  data.map((card , i) => (<Propertycard card={card} key={i} />))

                  data.filter((property)=> 
                  property.title.toLowerCase().includes(filter.toLowerCase()) ||
                  property.city.toLowerCase().includes(filter.toLowerCase()) ||
                  property.country.toLowerCase().includes(filter.toLowerCase()) 

                  )
                  .map((card , i) => (<Propertycard card={card} key={i} />))
}
                </div>
            </div>
           
            
        </div>
    );
}

export default Properties;
