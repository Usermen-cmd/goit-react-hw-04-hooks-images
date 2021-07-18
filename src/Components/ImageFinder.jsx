import { useState, useEffect } from 'react';
import { RiAlarmWarningLine } from 'react-icons/ri';
import LinearProgress from '@material-ui/core/LinearProgress';
//Components
import Button from 'Components/Button/Button';
import ImageGallery from 'Components/ImageGallery/ImageGallery';
import Modal from 'Components/Modal/Modal';
import Searchbar from 'Components/Searchbar/Searchbar';
//Utils
import toast, { Toaster } from 'react-hot-toast';
import { getImagesData } from 'utils/fetch';
import { smoothScrollTo } from 'utils/smoothScroll';
import isValidQuerryString from 'utils/isValidQuerryString';
//Styles
import { ImageFinderApp } from './ImageFinder.styles';

const ImageFinder = () => {
  const [imagesData, setImagesData] = useState([]);
  const [querryString, setQuerryString] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (querryString) {
      (async () => {
        try {
          setStatus('pending');
          const imgData = await getImagesData(querryString, page);
          setStatus('resolve');
          if (page > 1) {
            setImagesData(prev => [...prev, ...imgData]);
            smoothScrollTo('down');
            return;
          }
          setImagesData(imgData);
          smoothScrollTo('up');
        } catch (error) {
          toast.error(error.message);
        }
      })();
    }
  }, [querryString, page]);

  const onSubmitForm = newQuerry => {
    const isValid = isValidQuerryString(newQuerry, querryString);
    if (isValid) {
      setQuerryString(newQuerry);
      setPage(1);
    }
  };

  const onClickBtn = () => {
    setPage(prev => prev + 1);
  };

  const onImageClick = obj => {
    setModalImage(obj);
    window.addEventListener('keydown', onCloseModal);
  };

  const onCloseModal = ({ target, type, code }) => {
    const isCloseClick = target.tagName !== 'IMG' && type === 'click';
    const isEscapePress = code === 'Escape' && type === 'keydown';

    if (isCloseClick || isEscapePress) {
      setModalImage(null);
      window.removeEventListener('keydown', onCloseModal);
    }
  };

  const hasImage = imagesData.length > 0;
  const isResolve = status === 'resolve';
  const isIdle = status === 'idle';
  const isPending = status === 'pending';

  return (
    <ImageFinderApp>
      <Searchbar onSubmitForm={onSubmitForm} />
      {isIdle && (
        <p style={{ textAlign: 'center', fontSize: '24px' }}>Что ищем..?</p>
      )}
      {hasImage && (
        <ImageGallery
          imagesData={imagesData}
          onClick={onImageClick}
          status={isResolve}
        />
      )}
      {isPending && !hasImage && <LinearProgress />}
      {hasImage && <Button onClick={onClickBtn} />}
      {modalImage && <Modal imageData={modalImage} onClick={onCloseModal} />}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          icon: <RiAlarmWarningLine size="30" color="red" />,
        }}
      />
    </ImageFinderApp>
  );
};

export default ImageFinder;
