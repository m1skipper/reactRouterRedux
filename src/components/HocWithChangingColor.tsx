import React, { useState, useEffect } from 'react';

// Переливающийся цвет
const HocWithChangingColor = (BaseComponent: any) => {

  // HOC logic using hooks
  const colors = ['black', 'red', 'blue', 'green'];  
  const getRandomInt = (max : number) => Math.floor(Math.random() * max);  
  
  return function EnhancedComponent(props : any) {

    // HOC-specific logic using hooks
    const [count, setCount] = useState(getRandomInt(4));

    useEffect(() => {
      setTimeout(() => {
        let c = count + 1;
        if (c >= colors.length) c = 0;
        setCount(c);
      }, 1000);
    });

    return (
      <BaseComponent {...props} style={{ color: colors[count] }} />
    );
  };
 };

 export default HocWithChangingColor;
