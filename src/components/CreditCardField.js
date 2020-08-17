import React from 'react';

export default function CreditCardField({
  children,
  id,
  label,
  cssClass,
  autoComplete,
  value,
  handleInputChange,
}) {
  let baseCss = `flex flex-col ${cssClass || ''}`;

  // autocompletetype
  // autocomplete

  return (
    <div className={baseCss}>
      <label htmlFor={id} className="text-sm font-semibold text-gray-700">
        {label}
      </label>
      {children ? (
        children
      ) : (
        <input
          className="p-3 border rounded-sm"
          id={id}
          name={id}
          autoComplete={autoComplete}
          type="text"
          value={value}
          onChange={handleInputChange}
        />
      )}
      <span className="mt-1 ml-2 text-sm text-red-700" aria-live="polite"></span>
    </div>
  );
}
