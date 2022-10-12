import { useQtyState } from "hooks";
import { CartItem, CartOperationType } from "models";
import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

type Props = {
  productId?: string;
  localQty?: Number;
  incrementLocalQty?: () => void;
  decrementLocalQty?: () => void;
};

const QuantityInput = ({
  productId,
  localQty,
  incrementLocalQty,
  decrementLocalQty,
}: Props) => {
  const {
    increment,
    decrement,
    currentQty,
    changeQuantityByProductId,
    quantityByProductId,
  } = useQtyState();
  /* Checking if the productId is passed in as a prop. 
  If it is, it will return the JSX. If it is not,
 it will return the JSX below it. */
  if (productId) {
    return (
      <p className="quantity-desc">
        <span
          className="minus"
          onClick={() =>
            changeQuantityByProductId(productId, CartOperationType.decrement)
          }
        >
          <AiOutlineMinus />
        </span>
        <span className="num">{quantityByProductId(productId)}</span>
        <span
          className="plus"
          onClick={() =>
            changeQuantityByProductId(productId, CartOperationType.increment)
          }
        >
          <AiOutlinePlus />
        </span>
      </p>
    );
  }

  return (
    <p className="quantity-desc">
      <span className="minus" onClick={decrementLocalQty}>
        {/* <span className="minus" onClick={decrement}> */}
        <AiOutlineMinus />
      </span>
      <span className="num">{localQty?.toString()}</span>
      <span className="plus" onClick={incrementLocalQty}>
        {/* <span className="plus" onClick={increment}> */}
        <AiOutlinePlus />
      </span>
    </p>
  );
};

export default QuantityInput;
