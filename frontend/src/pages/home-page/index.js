import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useCoins, useGlobal } from "store/hooks";
import PromoteComponent from 'components/PromoteComponent';
import MainComponent from 'components/MainComponent';
import { LOCAL_STORAGE_KEY } from "consts";
const { TOKEN, USER_DATA } = LOCAL_STORAGE_KEY;

function HomePage({ location }) {
  const history = useHistory();
  const { showSubType, showType, setShowType, getDisplayAdverts, mainAdvert } = useGlobal();
  const { getPromoteCoins, promoteCoins, getMainCoins } = useCoins();

  useEffect(() => {
    if (localStorage.getItem(TOKEN) !== '' && localStorage.getItem(TOKEN) !== null &&
      (JSON.parse(localStorage.getItem(USER_DATA)).email_verified_at === null || JSON.parse(localStorage.getItem(USER_DATA)).email_verified_at === '')) {
      history.push('/verify_account')
      return;
    }

    if (localStorage.getItem(TOKEN) !== "" && localStorage.getItem(TOKEN) !== null && JSON.parse(localStorage.getItem(USER_DATA)).user_role === 'admin') {
      history.push('/dashboard');
      return;
    }


    const urlParams = new URLSearchParams(location.search);
    let type = urlParams.get('type');

    if (type === null || type === '') {
      history.push('/home?type=top ranked')
      type = "top ranked";
    }
    else
      setShowType(type);

    const init = async () => {
      await getMainCoins({ type: type, subType: showSubType })
      await getPromoteCoins();
      await getDisplayAdverts();
    }
    init();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const handleTypeChange = async (type) => {
    await getMainCoins({ type: type, subType: showSubType })
    setShowType(type);
    history.push('/home?type=' + type);
  }

  return (
    <div>
      <div className="flex lg:hidden justify-end mt-8">
        <div className="flex flex-col items-center justify-end mr-20">
          <a href="void(0);" className="mt-8 mb-auto boader-b-1">How it works?</a>
          <button
            className="main-boader bg-yellow-custom leading-normal text-black rounded-4 focus:outline-none w-72 py-5 hover:bg-yellow-600"
            onClick={e => history.push('/submit')}
          >SUBMIT A COIN</button>
        </div>
        <div className="main-boader rounded-4">
          <img src={mainAdvert !== null ? mainAdvert.advert_url : "assets/images/23fde8d7-59f7-4abc-95c0-5393e32cb024.gif"} alt="" className="is-hidden-mobile rounded-4 h-56 max-w-320"></img>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-20 mb-12">
        <div className="flex items-end w-full overflow-auto">
          <div className="flex">
            <button
              className={"coin-tab-btn font-thin text-white rounded-4 leading-normal focus:outline-none py-5 " + (showType === "featured" ? 'bg-tab-btn' : 'bg-transparent')}
              onClick={e => handleTypeChange('featured')}
            >featured</button>
            <button
              className={"coin-tab-btn font-thin text-white rounded-4 leading-normal focus:outline-none py-5 " + (showType === "top ranked" ? 'bg-tab-btn' : 'bg-transparent')}
              onClick={e => handleTypeChange('top ranked')}
            >top ranked</button>
            <button
              className={"coin-tab-btn font-thin text-white rounded-4 leading-normal focus:outline-none py-5 " + (showType === "hot" ? 'bg-tab-btn' : 'bg-transparent')}
              onClick={e => handleTypeChange('hot')}
            >hot!</button>
            <button
              className={"coin-tab-btn font-thin text-white rounded-4 leading-normal focus:outline-none py-5 " + (showType === "presale" ? 'bg-tab-btn' : 'bg-transparent')}
              onClick={e => handleTypeChange('presale')}
            >presale</button>
            <button
              className={"coin-tab-btn font-thin text-white rounded-4 leading-normal focus:outline-none py-5 " + (showType === "new" ? 'bg-tab-btn' : 'bg-transparent')}
              onClick={e => handleTypeChange('new')}
            >new</button>
            <button
              className={"coin-tab-btn font-thin text-white rounded-4 leading-normal focus:outline-none py-5 " + (showType === "favourites" ? 'bg-tab-btn' : 'bg-transparent')}
              onClick={e => { handleTypeChange('favourites'); history.push('/home?type=favourites'); }}
            >favourites</button>
          </div >
        </div >
        <div className="hidden lg:block">
          <div className="flex lg:ml-6">
            <div className="flex flex-col items-center justify-end mr-20">
              <a href="void(0);" className="mt-8 mb-auto boader-b-1">How it works?</a>
              <button
                className="main-boader bg-yellow-custom leading-normal text-black rounded-4 focus:outline-none w-72 py-5 hover:bg-yellow-600"
                onClick={e => history.push('/submit')}
              >SUBMIT A COIN</button>
            </div>
            <div className="main-boader rounded-4">
              <img src={mainAdvert !== null ? mainAdvert.advert_url : "assets/images/23fde8d7-59f7-4abc-95c0-5393e32cb024.gif"} alt="" className="is-hidden-mobile rounded-4 h-56"></img>
            </div>
          </div>
        </div>
      </div >

      <div className="grid grid-cols-1 lg:grid-cols-2 mb-12">
        <div className="lg:mr-6">
          <PromoteComponent data={promoteCoins.slice(0, 3)}></PromoteComponent>
        </div>
        <div className="ml-6 hidden lg:block">
          <PromoteComponent data={promoteCoins.slice(2, 5)}></PromoteComponent>
        </div>
      </div>

      <div className="flex">
        <div className="w-full">
          <MainComponent></MainComponent>
        </div>
        <div className="ml-12 py-12 px-6 main-boader rounded-4 hidden lg:block">
          <img src="assets/images/1854001112530771478.jpg" alt="" className="is-hidden-mobile rounded-4 w-96 h-full"></img>
        </div>
      </div>
    </div >
  );
}

export default HomePage;
