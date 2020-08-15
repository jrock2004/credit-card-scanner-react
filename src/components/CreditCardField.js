import React from 'react';

export default function CreditCardField({ children, id, label }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm font-semibold text-gray-700">
        {label}
      </label>
      {children}
    </div>
  );
}
