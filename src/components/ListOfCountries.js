import React from "react";
import Card from "./UI/Card";
import classes from './ListOfCountries.module.css';

function ListOfCountries(props){
    return( 
        <Card className={classes.card}>
            <li>
                <div>
                    <h3>{props.name}</h3>
                    <p>Region: {props.region}</p>
                    <p>Area size: {props.area} sq km.</p>
                </div>
            </li>   
        </Card>            
    );
}

export default ListOfCountries;