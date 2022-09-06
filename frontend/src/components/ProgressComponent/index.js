import React from 'react';
import { useGlobal } from "../../store/hooks";
import LinearProgress from '@material-ui/core/LinearProgress';

const ProgressComponent = () => {
  const { isProgressing } = useGlobal();

  return (
    <>
      {(isProgressing === true) ? (
        // <div className="progress-container">
        //   <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
        // </div>
        <div id="loadingDiv">
          <div className="flex justify-center flex-col items-center" style={{ width: '100vw', height: '100vh' }}>
            <p className="text-white text-base mb-4">
              Processing...
            </p>
            <LinearProgress className="w-xs max-w-full" color="primary" />
          </div>
        </div>
      ) : null
      }
    </>
  );
};

export default ProgressComponent;