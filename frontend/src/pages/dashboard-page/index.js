import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import AdvertComponent from 'components/AdvertComponent';
import { LOCAL_STORAGE_KEY } from "consts";
import CoinManagementComponent from 'components/CoinManageComponent';
const { TOKEN, USER_DATA } = LOCAL_STORAGE_KEY;

function DashboardPage({ location }) {
  const history = useHistory();
  const [tag, setTag] = useState('advert');

  useEffect(() => {
    if (localStorage.getItem(TOKEN) !== '' && localStorage.getItem(TOKEN) !== null &&
      (JSON.parse(localStorage.getItem(USER_DATA)).email_verified_at === null || JSON.parse(localStorage.getItem(USER_DATA)).email_verified_at === '')) {
      history.push('/verify_account')
      return;
    }

    if (localStorage.getItem(TOKEN) !== "" && localStorage.getItem(TOKEN) !== null && JSON.parse(localStorage.getItem(USER_DATA)).user_role === 'user') {
      history.push('/home');
      return;
    }
    const urlParams = new URLSearchParams(location.search);
    let tagTmp = urlParams.get('tag');

    if (tagTmp === null || tagTmp === '') {
      history.push('/dashboard?tag=advert')
    }
    else
      setTag(tagTmp);

  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="flex justify-center my-16">
        <button
          className={"coin-tab-btn font-thin text-white rounded-4 leading-normal focus:outline-none py-5 " + (tag === "advert" ? 'bg-tab-btn' : 'bg-transparent')}
          onClick={e => { setTag('advert'); history.push('/dashboard?tag=advert') }}
        >Advertise</button>
        <button
          className={"coin-tab-btn font-thin text-white rounded-4 leading-normal focus:outline-none py-5 " + (tag === "coins" ? 'bg-tab-btn' : 'bg-transparent')}
          onClick={e => { setTag('coins'); history.push('/dashboard?tag=coins') }}
        >Coins</button>
      </div>

      {
        tag === "advert" ?
          <AdvertComponent></AdvertComponent>
          : <CoinManagementComponent></CoinManagementComponent>
      }
    </div >
  );
}

export default DashboardPage;
