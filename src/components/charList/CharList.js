import './charList.scss';
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharList = (props) => {
  const [chars, setchars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(1531);
  const [charEnded, setCharEnded] = useState(false);

  const marvelService = new MarvelService();

  useEffect(() => {
    updateChars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRequest = (offset) => {
    onCharListLoading();
    marvelService.getAllCharacters(offset).then(onCharAddLoaded).catch(onError);
  };

  const updateChars = () => {
    setError(false);
    onCharLoading();
    marvelService.getAllCharacters().then(onCharLoaded).catch(onError);
  };

  const onCharLoading = () => {
    setLoading(true);
  };

  const onCharLoaded = (newChar) => {
    setchars(newChar);
    setLoading(false);
    setNewItemLoading(false);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const onCharListLoading = () => {
    setNewItemLoading(true);
  };

  const onCharAddLoaded = (newChar) => {
    let ended = false;
    if (newChar.length < 9) {
      ended = true;
    }
    setchars((chars) => [...chars, ...newChar]);
    setLoading(false);
    setOffset((offset) => offset + 9);
    setCharEnded(ended);
    setNewItemLoading(false);
  };

  let itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) =>
      item.classList.remove('char__item_selected')
    );
    itemRefs.current[id].classList.add('char__item_selected');
    itemRefs.current[id].focus();
  };


  const charElemetInit = (items) => {
    let imgStyle = { objectFit: 'cover' };
    const elements = items.map(({ id, name, thumbnail }, i) => {
      if (
        thumbnail ===
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
      ) {
        imgStyle = { objectFit: 'contain' };
      }
      return (
        <li
          ref={(e) => {
            itemRefs.current[i] = e;
          }}
          tabIndex={0}
          className="char__item"
          key={id}
          onClick={() => {
            props.onCharSelected(id);
            focusOnItem(i);
          }}
          onKeyPress={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              props.onCharSelected(id);
              focusOnItem(i);
            }
          }}
        >
          <img style={imgStyle} src={thumbnail} alt={name} />
          <div className="char__name">{name}</div>
        </li>
      );
    });
    return elements;
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = charElemetInit(chars);

  return (
    <div className="char__list">
      <ul className="char__grid ">
        {errorMessage}
        {spinner}
        {content}
      </ul>
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{ display: charEnded ? 'none' : 'block' }}
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};


CharList.propTypes = {
  onCharSelected: PropTypes.func,
};

export default CharList;
