import React from 'react';

const Notification = ({message,error}) => {
    if(message === null){
        return null
    }

    if(error){
        return(
            <div className= "errorMessage">
                {message}
            </div>
        )
    }
    else{
        return(
            <div className= "messageAdd">
                {message}
            </div>
        )
    }

}


export default Notification