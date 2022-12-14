import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import setContent from '../../utils/setContent';

const RandomChar = () => {
  const [char, setChar] = useState({});
  const { getCharacter, clearError, process, setProcess} = useMarvelService();

  useEffect(() => {
    updateChar();
    let timerId = setInterval(updateChar, 25000);
     return () => {
       clearInterval(timerId);
     }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateChar = () => {
     clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getCharacter(id)
      .then(onCharLoaded)
      .then(() => setProcess('confirmed'));
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const View = ({ data }) => {
    const { name, description, thumbnail, homepage } = data;

    let imgStyle = { objectFit: 'cover' };
    if (
      thumbnail ===
      'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    ) {
      imgStyle = { objectFit: 'contain' };
    }

    return (
      <div className="randomchar__block">
        <img
          src={thumbnail}
          alt="Random character"
          className="randomchar__img"
          style={imgStyle}
        />
        <div className="randomchar__info">
          <p className="randomchar__name">{name}</p>
          <p className="randomchar__descr">{description}</p>
          <div className="randomchar__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <Link
              className="button button button__secondary"
              to={`/character/${name}/${description}/${thumbnail.replaceAll(
                '/',
                '~'
              )}`}
            >
              <div className="inner">Wiki</div>
            </Link>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="randomchar">
      {setContent(process, View, char)}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button onClick={updateChar} className="button button__main">
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

export default RandomChar;
