import React from "react";

function InputWithLabel(props) {
    const { id, label, value, onChange, children } = props; 
  
    let inputRef = React.useRef(); 

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus(); 
      }
    }, [value]); 

    return (
      <>
        <label htmlFor="todoTitle">{children}</label>
        <div>
          <input
            ref={inputRef}
            id="todoTitle"
            type="text"
            name="title"
            value={value} 
            onChange={onChange}
          />
          <button type="submit">Add</button>
        </div>
      </>
    );
  }
            
export default InputWithLabel;