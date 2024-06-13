
import { useState } from "react";


const Counter = ({initialValue}) => {

  //State
    /* Here, we are using the nullish coalescing operator: The nullish coalescing operator has two operands on either side and it states that if the LEFT operand is either "null" or "undefined" it RETURNS the RIGHT side operand (Operands can be expressions as well) --> For example, the expression can be (null || undefined) ?? "default value" - This is an example of combining logical operators --> VERY useful when we are testing for setting default values */
  const [counter, setCounter] = useState(initialValue ?? 0)

  //Functions
  const handleAdd = () => {
    // setCounter(counter + 1);
      //Labmda Expression: Short functions that can take one or many parameters, but ONLY 1 expression
    setCounter((prevCount) => prevCount + 1);
  };

  const handleRemove = () => {
    setCounter((prevCount) => prevCount - 1);
  };
    
  return (

    <>
        <h1>Counter</h1>
        <span>{counter}</span>
        <button onClick={handleAdd}>+</button>
        <button onClick={handleRemove}>-</button>
    </>

  )
}

export default Counter;