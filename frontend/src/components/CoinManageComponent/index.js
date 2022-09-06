import React, { useEffect, useState } from 'react';
import CoinTable from 'components/CoinTable'
import { useCoins } from 'store/hooks';
import UploadProcessModal from 'components/UploadProcessModal';

const CoinManagementComponent = (props) => {
  const { getFromCoingecko, getBinanceCoinIds } = useCoins();
  const [showProcessDlg, setShowProcessDlg] = useState(false);
  const [processText, setProcessText] = useState();

  useEffect(() => {
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const getFromApi = async (e) => {
    e.preventDefault();
    setShowProcessDlg(true);
    setProcessText('Initializing...');

    const result = await getBinanceCoinIds();

    for (let i = 0; i < result.length; i++) {
      await getFromCoingecko({ id: result[i] });
      setProcessText(i + 1 + '/' + result.length + 'coins added....');
    }
    setShowProcessDlg(false);
  }

  return (
    <>
      <div className="main-boader rounded-4 px-6 py-4 flex flex-col">
        <div className="flex justify-end my-4">
          <button className="primary-btn py-4 px-8 rounded" onClick={e => getFromApi(e)}>From Coingecko</button>
        </div>
        <CoinTable></CoinTable>
      </div >
      {showProcessDlg ?
        <UploadProcessModal setShowProcessDlg={setShowProcessDlg} processText={processText}>
        </UploadProcessModal>
        : null
      }
    </>
  );
};

export default CoinManagementComponent;