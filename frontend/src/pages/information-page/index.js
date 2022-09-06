import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useCoins, useGlobal, useAuth } from "store/hooks";
import FavouriteStar from 'components/FavouriteStar'
import { useParams } from "react-router-dom";
import StarIcon from '@material-ui/icons/Star';
import LinkIcon from '@material-ui/icons/Link';
import TelegramIcon from '@material-ui/icons/Telegram';
import TwitterIcon from '@material-ui/icons/Twitter';
import NumberFormat from 'react-number-format';
import SaveIcon from '@material-ui/icons/Save';
import moment from 'moment';
import { Icon } from '@iconify/react';
import discordIcon from '@iconify-icons/simple-icons/discord';

function InformationPage() {
  const history = useHistory();
  const { getDisplayAdverts, informationAdvert, showType, showSubType } = useGlobal();
  const { token } = useAuth();
  const { getDisplayCoin, displayCoin, setUpvote } = useCoins();
  const [showCopied, setShowCopied] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    const init = async () => {
      await getDisplayCoin({ id: id.slice(5) });
      await getDisplayAdverts();
    }
    init();
  }, [id]);// eslint-disable-line react-hooks/exhaustive-deps

  const setUpvoteCoin = async (e) => {
    e.preventDefault();
    if (token === null || token === '' || token === undefined) {
      history.push('/login');
      return;
    }
    await setUpvote({ coin_id: displayCoin.id }, showType, showSubType);
  }

  const handleCopyAddress = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(displayCoin.contract);
    setShowCopied(true);
    setTimeout(function () {
      setShowCopied(false)
    }, 2000);
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 mt-20 mb-12">
        <div className="flex align-center mb-4 md:mb-auto">
          <a className="text-blue-300 text-xs" href="/">Home</a>
          <p className="mx-2 text-xs">-</p>
          <p className="text-xs">{displayCoin.name}</p>
        </div >
        <div className="ml-6 main-boader rounded-4">
          <img src={informationAdvert !== null ? informationAdvert.advert_url : "assets/images/23fde8d7-59f7-4abc-95c0-5393e32cb024.gif"} alt="" className="w-full is-hidden-mobile rounded-4 h-56"></img>
        </div>
      </div >

      <div className="main-boader grid grid-cols-1 md:grid-cols-3 mb-12 rounded w-full p-16" style={{ backgroundColor: '#091016' }}>
        <div className="col-span-2 md:mr-12">
          <div className="flex mb-12">
            <img src={displayCoin.logo} alt="" className="w-36 h-36 min-w-36 min-h-36 md:h-60 md:w-60 md:min-w-60 md:min-h-60"></img>
            <div>
              <div className="ml-8 md:flex md:items-center">
                <p className="text-16 font-bold" style={{ width: "fit-content" }}>{displayCoin.name}</p>
                <p className="text-16 font-bold bg-gray-500 rounded px-4 md:mx-8" style={{ width: "fit-content" }}>{displayCoin.symbol}</p>
                <FavouriteStar data={displayCoin}></FavouriteStar>
              </div>
              <div className="ml-8 flex items-center mt-8">
                {displayCoin.presale === true ?
                  <>
                    <p className="bg-yellow-500 rounded px-4 md:mr-4 text-xs">Presale</p>
                    <p className="text-xs break-all">This project is in presale phase. Contract announced later.</p>
                  </> :
                  <>
                    <p className="text-xs break-all">Contract Address: <b>{displayCoin.contract}</b>
                      <button className="ml-2" onClick={e => handleCopyAddress(e)}><SaveIcon className="text-gray -mt-2" /></button>
                      {showCopied ? "copied!" : ""}
                    </p>
                  </>
                }
              </div>
            </div>
          </div>
          <div className="border-gray-500 border-t-1"></div>

          <div className="md:flex my-4">
            <div className="flex items-center w-full md:w-auto mb-2 md:mb-0">
              <p className="text-xs md:w-auto w-3/5">Status:</p>
              <p className="px-4 text-xs bg-green-500 rounded py-2 md:ml-2">{displayCoin.status}</p>
            </div>
            <div className="flex items-center w-full md:w-auto mb-2 md:mb-0 md:ml-16">
              <p className="text-xs md:w-auto w-3/5">Votes:</p>
              <p className="px-4 text-xs bg-green-500 rounded py-2 md:ml-2">{displayCoin.total_votes}</p>
            </div>
            <div className="flex items-center w-full md:w-auto mb-2 md:mb-0 md:ml-16">
              <p className="text-xs md:w-auto w-3/5">Votes Today:</p>
              <p className="px-4 text-xs bg-gray-500 rounded py-2 md:ml-2">{displayCoin.today_votes}</p>
            </div>
            {/* <div className="flex items-center w-full md:w-auto mb-2 md:mb-0 md:ml-16">
              <p className="text-xs md:w-auto w-3/5">Network:</p>
              <p className="px-4 text-xs bg-gray-500 rounded py-2 md:ml-2">{displayCoin.network}</p>
            </div> */}
          </div>

          <div className="border-gray-500 border-t-1"></div>
          <div className="py-8">
            <div dangerouslySetInnerHTML={{ __html: displayCoin.description }}></div>
          </div>
          <div className="border-gray-500 border-t-1"></div>
          <div className="py-8">
            <p className="text-base font-bold">Vote for {displayCoin.name}</p>
            <p>Vote for {displayCoin.name} to increase its rank!</p>
            {
              displayCoin.total_votes > 4 ?
                <p className="text-xs text-green-500">Enough public votes have been made to list this coin.</p> :
                <p className="text-xs text-green-500">{5 - displayCoin.total_votes} more votes needed to list this coin as "ranked".</p>
            }
            <button onClick={e => setUpvoteCoin(e)} className="primary-btn w-full rounded p-4 my-2">{token !== "" && token !== null && token !== undefined ? "VOTE" : "PLEASE LOGIN TO VOTE"}</button>
            <p><i>You can vote once every 24hours!</i></p>
          </div>
          <div className="border-gray-500 border-t-1"></div>
          <div className="mt-8 flex">
            <p><i>Information incorrect? Please report it to</i><a className="ml-2" href="mailto:info@apeinsight.com">info@apeinsight.com</a></p>
          </div>
        </div>
        <div className="col-span-1 md:ml-20">
          <div className="mt-8">
            <p className="text-11 font-bold mb-8">Popularity</p>
            <div className="flex mb-8 items-center justify-between md:justify-start">
              <p className="text-11 w-80">Watchlists</p>
              <div className='flex items-center'>
                <StarIcon className="ml-2 text-yellow" />
                <p className="text-11">On</p>
                <p className="px-4 text-11 mx-2 bg-gray-500 rounded py-2">{displayCoin.total_favourites}</p>
                <p className="text-11">watchlists</p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-11 font-bold mb-8">Links</p>
            <div className="flex mb-8 items-center justify-between md:justify-start">
              <p className="text-11 w-80">Website</p>
              <div className='flex items-center'>
                <LinkIcon className="mr-2" />
                <a target="_blank" rel="noopener noreferrer" className="text-11" href={displayCoin.website}>Visit Website</a>
              </div>
            </div>
            {
              displayCoin.telegram !== null && displayCoin.telegram !== '' ?
                <div className="flex mb-8 items-center justify-between md:justify-start">
                  <p className="text-11 w-80">Telegram</p>
                  <div className='flex items-center'>
                    <TelegramIcon className="mr-2" />
                    <a target="_blank" rel="noopener noreferrer" className="text-11" href={displayCoin.telegram}>Visit Telegram</a>
                  </div>
                </div> : null
            }
            {
              displayCoin.twitter !== null && displayCoin.twitter !== '' ?
                <div className="flex mb-8 items-center justify-between md:justify-start">
                  <p className="text-11 w-80">Twitter</p>
                  <div className='flex items-center'>
                    <TwitterIcon className="mr-2" />
                    <a target="_blank" rel="noopener noreferrer" className="text-11" href={displayCoin.twitter}>Visit Twitter</a>
                  </div>
                </div> : null
            }
            {
              displayCoin.discord !== null && displayCoin.discord !== '' ?
                <div className="flex mb-8 items-center justify-between md:justify-start">
                  <p className="text-11 w-80">Discord</p>
                  <div className='flex items-center'>
                    <Icon icon={discordIcon} style={{ width: '20px', height: '20px', marginRight: "7.5px" }} />
                    <a target="_blank" rel="noopener noreferrer" className="text-11" href={displayCoin.discord}>Visit Discord</a>
                  </div>
                </div> : null
            }
          </div>
          <div className="mt-8">
            <p className="text-11 font-bold mb-8">Price</p>
            <div className="flex mb-8 items-center justify-between md:justify-start">
              <p className="text-11 w-80">Marketcap</p>
              <p className="text-11">{
                displayCoin.presale ? <NumberFormat value={Math.ceil((new Date(displayCoin.launch_date).getTime() - new Date().getTime()) / (1000 * 3600 * 24))} displayType={'text'} thousandSeparator={true} suffix={' Days to Launch'} /> :
                  <NumberFormat value={displayCoin.marketcap} displayType={'text'} thousandSeparator={true} prefix={'$'} />
              }</p>
            </div>
            <div className="flex mb-8 items-center justify-between md:justify-start">
              <p className="text-11 w-80">Price (USD)</p>
              <p className="text-11">{
                displayCoin.presale ? <NumberFormat value={Math.ceil((new Date(displayCoin.launch_date).getTime() - new Date().getTime()) / (1000 * 3600 * 24))} displayType={'text'} thousandSeparator={true} suffix={' Days to Launch'} /> :
                  <NumberFormat value={parseFloat(displayCoin.price_usd)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
              }</p>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-11 font-bold mb-8">Charts / Swap</p>
            <div className="flex mb-8 items-center justify-between md:justify-start">

              {
                displayCoin.network === "ETH" ?
                  <>
                    <p className="text-11 w-80">DexTools</p>
                    <a target="_blank" rel="noopener noreferrer" className="text-11" href={"https://www.dextools.io/app/uniswap/pair-explorer/" + displayCoin.contract}>DexTools</a>
                  </> :
                  <>
                    <p className="text-11 w-80">Poocoin</p>
                    <a target="_blank" rel="noopener noreferrer" className="text-11" href={"https://poocoin.app/tokens/" + displayCoin.contract}>Poocoin Chart</a>
                  </>
              }

            </div>
            <div className="flex mb-8 items-center justify-between md:justify-start">
              <p className="text-11 w-80">Buy Now</p>
              {
                displayCoin.network === "ETH" ?
                  <a target="_blank" rel="noopener noreferrer" className="text-11" href={"https://app.uniswap.org/#/swap?outputCurrency=" + displayCoin.contract}>Buy on UniSwap</a> :
                  <a target="_blank" rel="noopener noreferrer" className="text-11" href={"https://exchange.pancakeswap.finance/#/swap?outputCurrency=" + displayCoin.contract}>Buy on PancakeSwap</a>
              }

            </div>
          </div>
          <div className="mt-8">
            <p className="text-11 font-bold mb-8">Information</p>
            <div className="flex mb-8 items-center justify-between md:justify-start">
              <p className="text-11 w-80">Added</p>
              <p className="text-11">
                {moment(new Date(displayCoin.created_at)).format("MMMM DD YYYY")}
              </p>
            </div>
            <div className="flex mb-8 items-center justify-between md:justify-start">
              <p className="text-11 w-80">Launch</p>
              <p className="text-11">{moment(new Date(displayCoin.launch_date)).format("MMMM DD YYYY")}</p>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default InformationPage;
