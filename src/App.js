import React from 'react';

import UiContainer from './components/UiContainer';
import UiButton from './components/UiButton';
import CreditCard from './components/CreditCard';

function App() {
  return (
    <React.Fragment>
      <header className="fixed top-0 left-0 right-0 p-3 mb-3 bg-white border-b">
        <h1 className="text-2xl font-semibold">Credit Card POC</h1>
      </header>
      <main className="flex justify-center w-full mt-24">
        <div className="grid grid-flow-row gap-4">
          <UiContainer title={'Mini Card'}>
            <div>
              <h2 className="text-lg font-semibold">Tryout Clinics</h2>
              <div className="text-sm text-gray-700">
                <span>50 min</span>
                <span className="px-1">-</span>
                <span>$80.00</span>
              </div>
              <div className="pt-3 mt-4 border-t">
                <a href="#" className="text-sm font-semibold text-teal-600">
                  Apply gift code
                </a>
              </div>
            </div>
          </UiContainer>

          <UiContainer title={'Credit Card Details'}>
            <CreditCard />
          </UiContainer>

          <div className="mt-6">
            <UiButton>Complete</UiButton>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}

export default App;
