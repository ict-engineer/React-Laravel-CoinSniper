import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import isURL from 'validator/lib/isURL';
import { useCoins } from 'store/hooks'

const EditCoinModal = (props) => {
  const history = useHistory();
  const { editCoin } = useCoins();

  const [name, setName] = useState(props.data.name);
  const [symbol, setSymbol] = useState(props.data.symbol);
  const [network, setNetwork] = useState(props.data.network);
  const [presale, setPresale] = useState(props.data.presale ? "Yes" : "No");
  const [contract, setContract] = useState(props.data.contract);
  const [description, setDescription] = useState(props.data.description);
  const [website, setWebsite] = useState(props.data.website === null ? '' : props.data.website);
  const [launchDate, setLaunchDate] = useState(props.data.launch_date);
  const [telegram, setTelegram] = useState(props.data.telegram === null ? '' : props.data.telegram);
  const [twitter, setTwitter] = useState(props.data.twitter === null ? '' : props.data.twitter);
  const [discord, setDiscord] = useState(props.data.discord === null ? '' : props.data.discord);
  const [promoted, setPromoted] = useState(props.data.promoted ? "Yes" : "No");
  const [featured, setFeatured] = useState(props.data.featured ? "Yes" : "No");

  function isFormValid() {
    if (presale === 'No')
      return name.length > 0 && symbol.length > 0 && network.length > 0 && contract.length === 42 && description.length > 0 &&
        website.length > 0 && telegram.length > 0 && isURL(website) && isURL(telegram) && (twitter.length === 0 || isURL(twitter)) && (discord.length === 0 || isURL(discord));

    return name.length > 0 && symbol.length > 0 && network.length > 0 && (contract.length === 42 || contract.length === 0) && description.length > 0 &&
      website.length > 0 && telegram.length > 0 && isURL(website) && isURL(telegram) && (twitter.length === 0 || isURL(twitter)) && (discord.length === 0 || isURL(discord));
  }


  const handleSave = async () => {
    let pre = true;
    let pro = true;
    let fea = true;
    if (presale === 'No')
      pre = false;
    if (promoted === 'No')
      pro = false;
    if (featured === 'No')
      fea = false;

    await editCoin({
      id: props.data.id, name: name, symbol: symbol, network: network, presale: pre, contract: contract, description: description,
      website: website, launchDate: launchDate, telegram: telegram, discord: discord, twitter: twitter, promoted: pro, featured: fea
    });
  }

  return (
    <>
      <div
        className="justify-center items-center flex w-full overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative my-6 mx-auto w-192 md:w-384">
          {/*content*/}
          <div className="border-0 shadow-lg rounded relative flex flex-col w-full bg-black outline-none focus:outline-none p-8">
            <div className="flex justify-end">
              <button
                className="p-1 ml-auto bg-transparent border-0 text-white text-2xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => {
                  props.setShowEditDlg(false); history.push('/dashboard')
                }}
              >
                ×
              </button>
            </div>
            {/*body*/}
            <div className="relative px-6 py-2 flex flex-col w-full items-center">
              <div className=" grid grid-cols-1 md:grid-cols-2 w-full">
                <div className="mb-6 md:mb-12 md:px-4">
                  <p className="text-white font-bold mb-3">
                    Name*
                  </p>
                  <input
                    className="shadow appearance-none border-2 border-transparent rounded w-full py-4 px-6 leading-tight focus:outline-none focus:border-blue-500"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{ backgroundColor: "#0b1621" }}
                    autoComplete="off"
                    placeholder="Bitcoin">
                  </input>
                </div>
                <div className="mb-6 md:mb-12 md:px-4">
                  <p className="text-white font-bold mb-3">
                    Symbol*
                  </p>
                  <input
                    className="shadow appearance-none rounded border-2 border-transparent w-full py-4 px-6 leading-tight focus:outline-none focus:border-blue-500"
                    value={symbol}
                    onChange={e => setSymbol(e.target.value)}
                    style={{ backgroundColor: "#0b1621" }}
                    autoComplete="off"
                    placeholder="BTC">
                  </input>
                </div>
                <div className="mb-6 md:mb-12 md:px-4">
                  <p className="text-white font-bold mb-3">
                    Network/Chain
                  </p>
                  <select
                    style={{ backgroundColor: "#0b1621" }}
                    className="w-full py-5 px-6 form-select rounded focus:outline-none focus:border-blue-500"
                    value={network}
                    onChange={e => setNetwork(e.target.value)}
                  >
                    <option value="BSC">Binance Smart Chain (BSC)</option>
                    <option value="ETH">Ethereum (ETH)</option>
                    <option value="Matic">Polygon (Matic)</option>
                    <option value="TRX">Tron (TRX)</option>
                  </select>
                </div>
                <div className="mb-6 md:mb-12 md:px-4">
                  {
                    presale === 'Yes' ?
                      <p className="text-white font-bold mb-3">
                        Contract Address (optional for presales)
                      </p> :
                      <p className="text-white font-bold mb-3">
                        Contract Address*
                      </p>
                  }
                  <input
                    className="shadow appearance-none rounded border-2 border-transparent w-full py-4 px-6 leading-tight focus:outline-none focus:border-blue-500"
                    style={{ backgroundColor: "#0b1621" }}
                    value={contract}
                    onChange={e => setContract(e.target.value)}
                    autoComplete="off"
                    placeholder="0xCa99d757b7eC25362FeD03801065E99505309Cb5">
                  </input>
                  {contract !== "" && contract.length !== 42 ?
                    <p className='text-red-700 mb-6 md:mb-12 md:px-4 mt-2'>Input valid contract address.</p>
                    : null
                  }
                </div>

                <div className="mb-6 md:mb-12 md:px-4">
                  <p className="text-white font-bold mb-3">
                    Website link*
                  </p>
                  <input
                    value={website}
                    onChange={e => setWebsite(e.target.value)}
                    className="shadow appearance-none rounded border-2 border-transparent w-full py-4 px-6 leading-tight focus:outline-none focus:border-blue-500"
                    style={{ backgroundColor: "#0b1621" }}
                    autoComplete="off"
                    placeholder="https://website.com">
                  </input>
                  {website !== "" && !isURL(website) ?
                    <p className='text-red-700 mb-6 md:mb-12 md:px-4 mt-2'>Input valid website url.</p>
                    : null
                  }
                </div>
                <div className="mb-6 md:mb-12 md:px-4">
                  <p className="text-white font-bold mb-3">
                    Launch Date*
                  </p>
                  <input
                    className="shadow appearance-none rounded border-2 border-transparent w-full py-4 px-6 leading-tight focus:outline-none focus:border-blue-500"
                    style={{ backgroundColor: "#0b1621" }}
                    autoComplete="off"
                    type="date"
                    value={launchDate}
                    onChange={e => setLaunchDate(e.target.value)}
                    placeholder="">
                  </input>
                </div>
                <div className="mb-6 md:mb-12 md:px-4">
                  <p className="text-white font-bold mb-3">
                    Telegram link*
                  </p>
                  <input
                    value={telegram}
                    onChange={e => setTelegram(e.target.value)}
                    className="shadow appearance-none rounded border-2 border-transparent w-full py-4 px-6 leading-tight focus:outline-none focus:border-blue-500"
                    style={{ backgroundColor: "#0b1621" }}
                    autoComplete="off"
                    placeholder="https://telegram.com">
                  </input>
                  {telegram !== "" && !isURL(telegram) ?
                    <p className='text-red-700 mb-6 md:mb-12 md:px-4 mt-2'>Input valid telegram url.</p>
                    : null
                  }
                </div>
                <div className="mb-6 md:mb-12 md:px-4">
                  <p className="text-white font-bold mb-3">
                    Twitter link
                  </p>
                  <input
                    value={twitter}
                    onChange={e => setTwitter(e.target.value)}
                    className="shadow appearance-none rounded border-2 border-transparent w-full py-4 px-6 leading-tight focus:outline-none focus:border-blue-500"
                    style={{ backgroundColor: "#0b1621" }}
                    autoComplete="off"
                    placeholder="https://twitter.com">
                  </input>
                  {twitter !== "" && !isURL(twitter) ?
                    <p className='text-red-700 mb-6 md:mb-12 md:px-4 mt-2'>Input valid twitter url.</p>
                    : null
                  }
                </div>
                <div className="mb-6 md:mb-12 md:px-4">
                  <p className="text-white font-bold mb-3">
                    Discord link
                  </p>
                  <input
                    value={discord}
                    onChange={e => setDiscord(e.target.value)}
                    className="shadow appearance-none rounded border-2 border-transparent w-full py-4 px-6 leading-tight focus:outline-none focus:border-blue-500"
                    style={{ backgroundColor: "#0b1621" }}
                    autoComplete="off"
                    placeholder="https://discord.com">
                  </input>
                  {discord !== "" && !isURL(discord) ?
                    <p className='text-red-700 mb-6 md:mb-12 md:px-4 mt-2'>Input valid discord url.</p>
                    : null
                  }
                </div>
                <div className="mb-6 md:mb-12 md:px-4">
                  <p className="text-white font-bold mb-3">
                    Project in presale phase*
                  </p>
                  <div>
                    <input type="radio" value="No" name="presale" checked={presale === 'No'} onChange={e => setPresale(e.target.value)} /> No
                    <input type="radio" value="Yes" name="presale" className="ml-8" checked={presale === 'Yes'} onChange={e => setPresale(e.target.value)} /> Yes
                  </div>
                </div>
                <div className="mb-6 md:mb-12 md:px-4">
                  <p className="text-white font-bold mb-3">
                    Promoted
                  </p>
                  <div>
                    <input type="radio" value="No" name="promoted" checked={promoted === 'No'} onChange={e => setPromoted(e.target.value)} /> No
                    <input type="radio" value="Yes" name="promoted" className="ml-8" checked={promoted === 'Yes'} onChange={e => setPromoted(e.target.value)} /> Yes
                  </div>
                </div>
                <div className="mb-6 md:mb-12 md:px-4">
                  <p className="text-white font-bold mb-3">
                    Featured
                  </p>
                  <div>
                    <input type="radio" value="No" name="featured" checked={featured === 'No'} onChange={e => setFeatured(e.target.value)} /> No
                    <input type="radio" value="Yes" name="featured" className="ml-8" checked={featured === 'Yes'} onChange={e => setFeatured(e.target.value)} /> Yes
                  </div>
                </div>
                <div className="mb-6 md:mb-12 md:px-4 md:col-span-2 ">
                  <p className="text-white font-bold mb-3">
                    Description*
                  </p>
                  <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="resize-y shadow appearance-none rounded border-2 border-transparent w-full py-4 px-6 leading-tight focus:outline-none focus:border-blue-500 min-h-60"
                    style={{ backgroundColor: "#0b1621" }}
                    autoComplete="off"
                    placeholder="Describe your coin here. What is the goal, plans, why is this coin unique?">
                  </textarea>
                </div>
              </div>

              <button
                className="primary-btn text-10 w-80 my-16 py-4 rounded"
                onClick={e => { props.setShowEditDlg(false); handleSave() }}
                disabled={!isFormValid()}
              >Save</button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-white opacity-70 blur-3xl"></div>
    </>
  );
};

export default EditCoinModal;
