import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/gridListProduct.css'; // Importez votre fichier CSS

function GridListProduct({listProduct}){

    return(
        <div class="containerGrid">
            {listProduct.map(product =>(
                <Link to={`/product/${product.id}`} key={product.id} style={{ textDecoration: 'none' }}>
                    <div class="containerProduct" >
                        <img class="imgProduct" src="images/phone.jpg"/>
                        <div class="miniInfo">
                            <p class="title">{product.title}</p>
                            <p class="price">{product.price}<span style={{color:"#66A865"}}>$</span></p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default GridListProduct