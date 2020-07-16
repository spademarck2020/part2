import React from 'react';

const Filter = ({ filterSearch, onChangeInputSearchName }) => {
    return(
        <div>
            filter shown with
            <input 
            value={filterSearch}
            onChange={onChangeInputSearchName} />
        </div>
    )
}

export default Filter