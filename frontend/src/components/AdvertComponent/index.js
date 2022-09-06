import React, { useEffect, useState } from 'react';
import { useGlobal } from "store/hooks";
import AdvertTable from "components/AdvertTable"
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const AdvertComponent = (props) => {
  const { getAllAdverts, allAdverts, uploadAdvert } = useGlobal();
  const [image, setImage] = useState('');

  useEffect(() => {
    const init = async () => {
      await getAllAdverts();
    }
    init();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const onChange = (e) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length)
      return;
    setImage(files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    await uploadAdvert(formData)
  }
  return (
    <div className="main-boader rounded-4 px-6 py-4 flex flex-col">
      <div className="flex justify-end my-6">
        <form method="POST" id="upload-image" onSubmit={e => handleSubmit(e)} encType="multipart/form-data" className="flex items-center">
          <label
            className="flex items-center px-4 py-6 bg-white rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-purple-600 hover:text-white text-purple-600 ease-linear transition-all duration-150">
            <CloudUploadIcon></CloudUploadIcon>
            <span>Select a file</span>
            <input type='file' className="hidden" onChange={e => onChange(e)} accept=".gif" />
          </label>
          <button type="submit" className="ml-4 rounded py-2 px-4 primary-btn" disabled={image === ''}>Upload</button>
        </form>
      </div>
      <AdvertTable data={allAdverts}></AdvertTable>
    </div >
  );
};

export default AdvertComponent;