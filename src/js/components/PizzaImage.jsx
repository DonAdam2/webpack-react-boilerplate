import React from 'react';

import classes from '../../scss/PizzaImage.scss';
import PizzaImg from '../../assets/pizza.jpg';

const PizzaImage = (props) => {
    return (
        <div className={classes.pizzaImage}>
            <h1 className={classes.title}>pizza image</h1>
            <img className={classes.pizzaImg} src={PizzaImg} alt="pizza image"/>
        </div>
)
    ;
};

export default PizzaImage;