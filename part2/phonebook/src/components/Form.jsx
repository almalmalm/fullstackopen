import React from 'react';

const Form = ({
  phoneValue,
  nameValue,
  onSubmit,
  nameOnChange,
  phoneOnChange,
}) => {
  console.log();
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={nameValue} onChange={nameOnChange} />
        </div>
        <div>
          number: <input value={phoneValue} onChange={phoneOnChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
