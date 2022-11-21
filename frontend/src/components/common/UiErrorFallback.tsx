import { useEffect } from 'react';
import { FallbackProps } from 'react-error-boundary';

const DEV_MODE = true;

const UiErrorFallback = ({ error }: FallbackProps) => {
  useEffect(() => {
    DEV_MODE && console.log(error);
  }, []);

  return (
    <div>
      THIS IS UI ERROR!
      <a
        href="/"
        style={{ width: '50px', height: '50px', backgroundColor: 'yellow' }}
      >
        Go Back
      </a>
    </div>
  );
};

export default UiErrorFallback;
