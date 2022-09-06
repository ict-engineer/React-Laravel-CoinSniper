import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

const UploadProcessModal = (props) => {

  return (
    <>
      <div
        className="justify-center items-center flex w-full overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative my-6 mx-auto w-192 md:w-384">
          {/*content*/}
          <div className="border-0 shadow-lg rounded relative flex flex-col w-full bg-black outline-none focus:outline-none p-16">
            {/*body*/}
            <div className="relative px-6 py-2 flex flex-col w-full items-center">
              <p className='text-sm text-white'>{props.processText}</p>
              <LinearProgress className="w-xs max-w-full mt-4" color="primary" />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-white opacity-70 blur-3xl"></div>
    </>
  );
};

export default UploadProcessModal;
