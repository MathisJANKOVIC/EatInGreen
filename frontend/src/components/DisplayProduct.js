import React from 'react';

function DisplayProduct({productData}){

    return(
        <div>
            <h2>{productData.title}</h2>
            <p>{productData.description}</p>
            <p>Price: {productData.price}</p>
        </div>
    );
}

export default DisplayProduct