import React from "react";
import classes from './Layout.module.css';

function Layout(props){
    return(
        <div className={classes.layout}>
            <h1 className={classes.header}>Countrypedia</h1>
            <button onClick={props.onAscSorting}>sort (ascending)</button>
            <button onClick={props.onDescSorting}>sort (descending)</button>
            <button className={classes.button} onClick={props.onFilter}>Filter</button>
            {props.children}
        </div>
    );
}

export default Layout;