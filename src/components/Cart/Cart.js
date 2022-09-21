import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../store/cart-context";
import classes from "./Cart.module.css";
import Checkout from "./Checkout";
const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const [showForm, setShowForm] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const formHandler = () => {
    setShowForm(true);
  };

  const onSubmitHandler = async (userData) => {
    setIsSubmiting(true);
    await fetch(
      "https://food-ordering-system-72519-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderItems: cartCtx.items,
        }),
      }
    );
    setIsSubmiting(false);
    setDidSubmit(true);
    cartCtx.removeAllItems()
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        ></CartItem>
      ))}
    </ul>
  );
  const cartData = (
    <React.Fragment>
      <div>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>

        {showForm && (
          <Checkout
            onConfirm={onSubmitHandler}
            onHideCart={props.onHideCart}
          ></Checkout>
        )}
        {!showForm && (
          <div className={classes.actions}>
            <button
              className={classes["button--alt"]}
              onClick={props.onHideCart}
            >
              Close
            </button>
            {hasItems && (
              <button className={classes.button} onClick={formHandler}>
                Order
              </button>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );

  const submittingData = <p>Sending Order data...</p>;

  const submittedData = (
    <React.Fragment>
      <p>Your Order Has been placed.. </p>
      <p>Thank You for Trusting Us</p>

      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );
  return <Modal onClose={props.onClose}>
  {!isSubmiting && !didSubmit && cartData}
  {isSubmiting && submittingData}
  {!isSubmiting && didSubmit && submittedData}
  </Modal>;
};
export default Cart;
