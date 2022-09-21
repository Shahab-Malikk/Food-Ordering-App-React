import { useContext,useState,useEffect } from 'react'
import CartIcon from '../Cart/CartIcon'
import CartContext from '../store/cart-context'
import classes from './HeaderCartButton.module.css'
const HeaderCartButton=(props)=>{
    const [btnIsHighlighted, setBtnIsHighlted]=useState(false)
   
    const cartCtx= useContext(CartContext);
    const {items}=cartCtx
    const numberOfCartItems=cartCtx.items.reduce((curNum,item)=>{
        return curNum+item.amount
    },0)
    const btnClasses=`${classes.button} ${btnIsHighlighted? classes.bump:''}`
useEffect(() => {
    if(items.length===0){
        return
    }
const timer=setBtnIsHighlted(true)
setTimeout(()=>{
    setBtnIsHighlted(false)
},300)
    return () => {
        clearTimeout(timer)
    };
}, [items]);

    return <button className={btnClasses} onClick={props.onClick}>
    <span className={classes.icon}>
    <CartIcon></CartIcon>
    </span>
    <span> Your Cart</span>
    <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
}
export default HeaderCartButton