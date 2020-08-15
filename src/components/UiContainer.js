import React from 'react';

export default function UiContainer({ children, title }) {
  return (
    <div className="bg-white border shadow-sm w-68 max-w-68 lg:rounded-sm ui-container">
      <div className="px-4 py-2 border-b">
        <h2 className="uppercase">{title}</h2>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
