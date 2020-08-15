import React from 'react';

export default function UiButton({ children }) {
  return (
    <React.Fragment>
      <button type="button" className="w-full py-4 text-lg text-white bg-teal-600">
        {children}
      </button>
    </React.Fragment>
  );
}
