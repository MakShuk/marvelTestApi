import { useState, useEffect, useRef } from 'react';
import MarvelService from '../../services/MarvelService';
import AppBaner from '../appBanner/AppBanner';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsPage.scss';

const ComicsPage = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newComicsLoading, setNewComicsLoading] = useState(false);
  const [offset, setOffset] = useState(30);
  const [comicsEnded, setComicsEndet] = useState(false);

  const marvelService = new MarvelService();
  let counter = useRef(0);

  useEffect(() => {
    counter.current++;
    console.log(`Rendering page: ${counter.current}`);
  });

  useEffect(() => {
    updateComics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateComics = () => {
    setError(false);
    onComicsLoading();
    marvelService.getAllComics().then(onComicsLoaded).catch(onError);
  };

  const onComicsLoading = () => {
    setLoading(true);
  };

  const onComicsLoaded = (comics) => {
    setComics(comics);
    setLoading(false);
    setNewComicsLoading(false);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const onRequest = (offset) => {
    onCharListLoading();
    marvelService.getAllComics(offset).then(onComicsAddLoaded).catch(onError);
  };
  const onCharListLoading = () => {
    setNewComicsLoading(true);
  };

  const onComicsAddLoaded = (newComics) => {
    let ended = false;
    if (newComics.length < 9) {
      ended = true;
    }
    setComics((comics) => [...comics, ...newComics]);
    //setComics((comics) => Array.from(new Set(comics.concat(newComics))));

    setLoading(false);
    setOffset((offset) => offset + 9);
    setComicsEndet(ended);
    setNewComicsLoading(false);
  };

  let itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) =>
      item.classList.remove('comics__item_selected')
    );
    itemRefs.current[id].classList.add('comics__item_selected');
    itemRefs.current[id].focus();
  };

  const comicsElemetInit = (items) => {
    let imgStyle = { objectFit: 'cover' };
    let comicsId = [];
    let duplicateIndex = [] 
    const elements = items.map(({ id, title, image, price }, i) => {
      price = price ? `price: ${price}$` : 'not available';
      if (
        image ===
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
      ) {
        imgStyle = { objectFit: 'contain' };
      }
    
      if (comicsId.includes(id)) duplicateIndex.push({id:id, i:i})
      
      comicsId.push(id);
      return (
        <li
          ref={(e) => {
            itemRefs.current[i] = e;
          }}
          tabIndex={0}
          className="comics__item"
          key={id}
          onClick={() => {
            // props.onCharSelected(id);
            focusOnItem(i);
          }}
          onKeyPress={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              //  props.onCharSelected(id);
              focusOnItem(i);
            }
          }}
        >
          <img style={imgStyle} src={image} alt={title} />
          <div className="comics__name">{title}</div>
          <div className="comics__prise">{price}</div>
        </li>
      );
    });
   
    duplicateIndex.forEach((i) => elements.splice(i.i, 1, null));

    return elements;
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = comicsElemetInit(comics);

  return (
    <>
      <AppBaner />
      <div className="comics__list">
        <ul className="comics__grid ">
          {errorMessage}
          {spinner}
          {content}
        </ul>
        <button
          className="button button__main button__long"
          disabled={newComicsLoading}
          style={{ display: comicsEnded ? 'none' : 'block' }}
          onClick={() => onRequest(offset)}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    </>
  );
};

export default ComicsPage;
