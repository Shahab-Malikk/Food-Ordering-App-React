import { Fragment } from "react"
import HeaderCartButton from "./HeaderCartButton"
import classes from './Header.module.css'
import headerImg from '../../assests/meals.jpg'
const Header=(props)=>{
return <Fragment>
<header className={classes.header}>
<h1>ReactMeal</h1>
<HeaderCartButton onClick={props.onShownCart}></HeaderCartButton>
</header>
<div className={classes['main-image']}>
<img src={headerImg}  alt="Delicious meals "/>
</div>
</Fragment>
}
export default Header