import React from 'react';

const UiErrorFallback = ({ error }: any) => {
  console.log({ error });
  return (
    <div>
      <div style={{ fontSize: '50px' }}>
        {error.error}
        THIS IS UI ERROR!
        <button
          style={{ width: '50px', height: '50px', backgroundColor: 'yellow' }}
          onClick={() => {
            window.location.href = '/';
          }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default UiErrorFallback;
