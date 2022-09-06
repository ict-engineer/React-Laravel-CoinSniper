import React from 'react';
import { useAuth } from 'store/hooks'

function VerifyPage() {
  const { resendVerifyLink } = useAuth();

  return (
    <div className="w-full flex justify-center">
      <div className='flex flex-col items-center w-288'>
        <p className='text-xl px-16 text-center mt-36'>Almost there...</p>
        <p className='px-8 text-center mt-8 mb-16 text-13'>Please check your email to confirm your account.</p>
        <div className="w-full border-1 border-white"></div>
        <p className='px-20 text-center mt-16 text-10'>If you haven't received our email in 15 minutes, please check your spam folder.</p>
        <p className='px-20 text-center mt-16 text-10'>Still can't find it? Try searching for "in:all subject:(verify your email address)"</p>
        <button className="primary-btn rounded-full px-12 py-6 mt-16" onClick={e => resendVerifyLink()}>
          Resend verification link
        </button >
      </div>
    </div>
  );
}

export default VerifyPage;
