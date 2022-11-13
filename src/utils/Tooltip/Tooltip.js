import React, { memo, useState } from 'react';
import ErrorBoundary from '../Error-boundry';
import './Tooltip.scss';

const Tooltip = ({
  id = Date.now(),
  list = [],
  children,
  onSelect,
  toggleOnMouseEnterLeave,
}) => {
  const [show, setShow] = useState(false);

  const onClickHandler = selectedItem => {
    typeof onSelect === 'function' && onSelect(selectedItem);
  };

  const onFocusBlurHandler = (flag, event) => {
    event.preventDefault();
    setShow(flag);
  };

  const onMouseEnterLeave = (flag, event) => {
    event.preventDefault();
    if (toggleOnMouseEnterLeave) {
      setShow(flag);
    }
  };

  return (
    <ErrorBoundary>
      <div
        className='tooltip-container flex center'
        onMouseEnter={e => onMouseEnterLeave(true, e)}
        onMouseLeave={e => onMouseEnterLeave(false, e)}
      >
        {show && (
          <ul className='tooltip'>
            {list.map(item => (
              <li
                className='tooltip-item'
                key={item}
                onMouseDown={() => onClickHandler(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
        <label htmlFor={id} className='flex center pointer'>
          {children}
        </label>
        <input
          id={id}
          onFocus={e => onFocusBlurHandler(true, e)}
          onBlur={e => onFocusBlurHandler(false, e)}
          readOnly
        />
      </div>
    </ErrorBoundary>
  );
};

export default memo(Tooltip);
