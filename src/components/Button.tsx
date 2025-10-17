import React from 'react';
import './Button.css';

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children = "Press Me!",
  onClick,
  className = ""
}) => {
  const text = typeof children === 'string' ? children : 'Press Me!';

  return (
    <button
      type="button"
      className={`btn btn-primary ${className}`}
      onClick={onClick}
      data-text={text}
    >
      {children}
    </button>
  );
};

export default Button;
