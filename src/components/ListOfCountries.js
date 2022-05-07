import React from "react";

function ListOfCountries(props){
    return( 
        <li>
            <div>
                <h3>{props.name}</h3>
                <p>Region: {props.region}</p>
                <p>Area size: {props.area}</p>
            </div>
        </li>        
    );
}

export default ListOfCountries;