import CoinAnimate from '../../components/CoinAnimate';
import Button from '@material-ui/core/Button';
import React, { useState, useRef, useCallback } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ReCAPTCHA from "react-google-recaptcha";
import Checkbox from '@material-ui/core/Checkbox';
import moment from "moment";
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider'
import getCroppedImg from './cropImage'
import { useCoins } from 'store/hooks'
import isURL from 'validator/lib/isURL';

function SubmitPage() {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  // const [network, setNetwork] = useState('BSC');
  const [presale, setPresale] = useState('No');
  const [contract, setContract] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [launchDate, setLaunchDate] = useState(moment().format("YYYY-MM-DD"));
  const [telegram, setTelegram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [discord, setDiscord] = useState('');
  const [acceptTermsConditions, setAcceptTermsConditions] = useState(false);
  const [captchaVal, setCaptchaVal] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [sourceImg, setSourceImg] = useState('');
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState('assets/images/upload_logo.png')
  const [isCropping, setIsCropping] = useState(false);
  const inputFile = useRef(null);
  const { uploadCoin } = useCoins();

  function isFormValid() {
    if (presale === 'No')
      return !isUploading && name.length > 0 && symbol.length > 0 && contract.length === 42 && description.length > 0 &&
        acceptTermsConditions === true && website.length > 0 && telegram.length > 0 && captchaVal !== null && isURL(website) &&
        isURL(telegram) && (twitter.length === 0 || isURL(twitter)) && (discord.length === 0 || isURL(discord)) && croppedImage !== 'assets/images/upload_logo.png';

    return !isUploading && name.length > 0 && symbol.length > 0 && (contract.length === 42 || contract.length === 0) && description.length > 0 &&
      acceptTermsConditions === true && website.length > 0 && telegram.length > 0 && captchaVal !== null && isURL(website) &&
      isURL(telegram) && (twitter.length === 0 || isURL(twitter)) && (discord.length === 0 || isURL(discord)) && croppedImage !== 'assets/images/upload_logo.png';
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    let pre = true;
    if (presale === 'No')
      pre = false;
    toDataURL(croppedImage, async function (dataUrl) {
      setIsUploading(true);
      await uploadCoin({
        name: name, symbol: symbol, presale: pre, contract: contract, description: description,
        website: website, launchDate: launchDate, telegram: telegram, discord: discord, twitter: twitter, image: dataUrl
      });
      setIsUploading(false);
    })
  }

  function onCaptchaChange(value) {
    setCaptchaVal(value);
  }

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }



  const showCroppedImage = useCallback(async () => {
    try {
      const cropped = await getCroppedImg(
        sourceImg,
        croppedAreaPixels,
      )

      setCroppedImage(cropped)
      setIsCropping(false);
      setZoom(1);
      setCrop({ x: 0, y: 0 });
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, sourceImg])

  function handleFileSelect(e) {
    var files = e.target.files;
    if (files.length < 1) {
      alert('select a file...');
      return;
    }
    setSourceImg(URL.createObjectURL(files[0]));
    setIsCropping(true);
  }

  return (
    <div className='flex flex-col flex-auto flex-shrink-0 items-center justify-center p-0 sm:p-16'>
      <div className="flex flex-col items-center justify-center w-full ">
        <CoinAnimate animation="transition.expandIn">
          <div className="w-full rounded max-w-320 p-24 bg-black text-white">
            <p className="text-white text-16 font-bold mb-6">Submit new coin to ApeInsight</p>
            <p>Please fill out this form carefully to add a new coin to <a href="/" className="text-blue-700">ApeInsight</a>. After submission, your coin will be visible on the New Listings page.
              Get 500 votes to be officially listed on <a href="/" className="text-blue-700">ApeInsight</a>.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 mb-12 w-full mt-12">
              <div className="md:mr-20 max-w-160">
                <p className="text-white text-center font-bold mb-2">Logo Upload*</p>
                {isCropping ?
                  <div>
                    <div className="w-full relative" style={{ paddingTop: '100%' }}>
                      <Cropper
                        image={sourceImg}
                        crop={crop}
                        zoom={zoom}
                        style={{ backgroundColor: "transparent" }}
                        aspect={1 / 1}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                      />
                    </div>
                    <div className="p-4 flex justify-center">
                      <Slider
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        aria-labelledby="Zoom"
                        onChange={(e, zoom) => setZoom(zoom)}
                      />
                    </div>
                    <div className="flex justify-center">
                      <Button
                        onClick={showCroppedImage}
                        variant="contained"
                        color="primary"
                      >
                        Save
                      </Button>
                    </div>
                  </div> :
                  <div>
                    <div className="w-full relative">
                      <div className="crop-image border-1 border-white">
                        <img className="w-full h-full" src={croppedImage} alt=""></img>
                      </div>
                      <div className="absolute top-0 left-0 crop-hover w-full h-full">
                        <div className="w-full h-full flex justify-center items-center" onClick={e => inputFile.current.click()}>
                          <p className="text-60"> +</p>
                        </div>
                        <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={e => handleFileSelect(e)} accept=".png, .jpg, .jpeg" />
                      </div>
                    </div>
                  </div>
                }
              </div>
              <div>
                <div className="mb-6">
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
                <div className="mb-6">
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
                <div className="mb-6">
                  <p className="text-white font-bold mb-3">
                    Project in presale phase*
                  </p>
                  <div onChange={e => setPresale(e.target.value)}>
                    <input type="radio" value="No" name="presale" defaultChecked /> No
                    <input type="radio" value="Yes" name="presale" className="ml-8" /> Yes
                  </div>
                </div>
                {/* <div className="mb-6">
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
                </div> */}
              </div>
            </div>
            <div className="mb-6">
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
                <p className='text-red-700 mb-6 mt-2'>Input valid contract address.</p>
                : null
              }
            </div>
            <div className="mb-6">
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
            <div className="mb-6">
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
                <p className='text-red-700 mb-6 mt-2'>Input valid website url.</p>
                : null
              }
            </div>
            <div className="mb-6">
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
            <div className="mb-6">
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
                <p className='text-red-700 mb-6 mt-2'>Input valid telegram url.</p>
                : null
              }
            </div>
            <div className="mb-6">
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
                <p className='text-red-700 mb-6 mt-2'>Input valid twitter url.</p>
                : null
              }
            </div>
            <div className="mb-6">
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
                <p className='text-red-700 mb-6 mt-2'>Input valid discord url.</p>
                : null
              }
            </div>
            <FormControl className="mb-8 w-full">
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={acceptTermsConditions}
                    onChange={e => setAcceptTermsConditions(e.target.checked)}
                  />
                }
                label="I read and accept terms and conditions"
              />
            </FormControl>

            <div className="m-4"></div>

            <div className="flex justify-start w-full overflow-auto">
              <ReCAPTCHA
                sitekey="6Lcjn64bAAAAAE5dqtTtys_T48G845ESIxwY8ZWg"
                onChange={onCaptchaChange}
              />
            </div>

            <div className="m-4"></div>

            <Button
              variant="contained"
              color="primary"
              className="w-full"
              onClick={handleSubmit}
              disabled={!isFormValid()}
            >
              Submit
            </Button>
          </div>
        </CoinAnimate>
      </div>
    </div >
  );
}

export default SubmitPage;
