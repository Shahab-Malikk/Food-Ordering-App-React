import { useRef,useState } from 'react';
import classes from './Checkout.module.css';
const isEmpty=value=>value.trim()===''
const fiveChars=value=>value.trim().length===5
const Checkout = (props) => {
const nameRef=useRef()
const streetRef=useRef()
const poCodeRef=useRef()
const cityRef=useRef()
const [formInputValidity,setFormInputValidity]=useState(
  {
    name:true,
    street:true,
    postCoode:true,
    city:true
  }
);


  const confirmHandler = (event) => {
    event.preventDefault();
const enteredName=nameRef.current.value
const enteredStreet=streetRef.current.value
const enteredPoCode=poCodeRef.current.value
const enteredCity=cityRef.current.value
const enteredNameisValid=!isEmpty(enteredName)
const enteredStreetisValid=!isEmpty(enteredStreet)
const enteredPoCodeisValid=fiveChars(enteredPoCode)
const enteredCityisValid=!isEmpty(enteredCity)

setFormInputValidity({
  name:enteredNameisValid,
  street:enteredStreetisValid,
  postCoode:enteredPoCodeisValid,
  city:enteredCityisValid
})



const formIsValid= enteredNameisValid && enteredStreetisValid && enteredCityisValid && enteredPoCodeisValid

if(!formIsValid){
  return 
}

props.onConfirm({
  name:enteredName,
  street:enteredStreet,
  postCode:enteredPoCode,
  city:enteredCity,
})
  };


const nameInvalidControl=`${classes.control}  ${formInputValidity.name ? '':classes.invalid}`
const streetInvalidControl=`${classes.control}  ${formInputValidity.street ? '':classes.invalid}`
const postalCodeInvalidControl=`${classes.control}  ${formInputValidity.postCoode ? '':classes.invalid}`
const cityInvalidControl=`${classes.control}  ${formInputValidity.city ? '':classes.invalid}`
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInvalidControl}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameRef}/>
        {!formInputValidity.name && <p>Enter Valid Name</p>}
      </div>
      <div className={streetInvalidControl}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetRef}/>
        {!formInputValidity.street && <p>Enter Street Name</p>}
      </div>
      <div className={postalCodeInvalidControl}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={poCodeRef}/>
        {!formInputValidity.postCoode && <p>Enter Valid PostalCode (Max 5 digits)</p>}
      </div>
      <div className={cityInvalidControl}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityRef}/>
        {!formInputValidity.city && <p>Enter Valid City</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onHideCart}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;