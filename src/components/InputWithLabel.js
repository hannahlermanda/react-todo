import React from "react";
import PropTypes from 'prop-types';

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

  InputWithLabel.propTypes = {
    id: PropTypes.string, 
    label: PropTypes.string, 
    value: PropTypes.string, 
    onChange: PropTypes.func, 
    children: PropTypes.node 
};
            
export default InputWithLabel;