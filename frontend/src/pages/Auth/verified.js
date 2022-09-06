import React, { useEffect } from 'react';
import { useAuth } from 'store/hooks'
import { useHistory } from "react-router-dom";
import { LOCAL_STORAGE_KEY } from "../../consts";
const { USER_DATA } = LOCAL_STORAGE_KEY;

function VerifiedPage() {
  const { getUserInfo } = useAuth();
  const history = useHistory();

  useEffect(() => {
    const init = async () => {
      const result = await getUserInfo();
      if (result) {
        let saved = localStorage.getItem(USER_DATA);
        const parsed = JSON.parse(saved);
        if (parsed.email_verified_at === null || parsed.email_verified_at === '')
          history.push('/verify_account');
        else
          history.push('/');
      }
    }

    init();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <></>
  );
}

export default VerifiedPage;
