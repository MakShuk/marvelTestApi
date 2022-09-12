import './charList.scss';
import React, { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      chars: [],
      loading: true,
      error: false,
      newItemLoading: false,
      offset: 1531,
      charEnded: false,
    };
  }

  componentDidMount() {
    this.updateChars();
    // this.onFocusElement(
    //   this.myRef.current,
    //   '.char__item',
    //   'char__item_selected'
    // );
  }

  // onFocusElement(perent, childClass, toggleClass) {
  //   perent.addEventListener('click', (e) => {
  //     document.querySelectorAll(childClass).forEach((e) => {
  //       e.classList.remove(toggleClass);
  //     });
  //     if (e.target && e.target.matches(childClass)) {
  //       e.target.classList.add(toggleClass);
  //     }
  //     if (e.target && e.target.parentElement.matches(childClass)) {
  //       e.target.parentElement.classList.add(toggleClass);
  //     }
  //   });
  // }

  const onRequest = (offset) => {
    onCharListLoading();
    marvelService.getAllCharacters(offset).then(onCharAddLoaded).catch(onError);
  };

  const updateChars = () => {
    setError(false);
    onCharLoading();
    marvelService.getAllCharacters().then(onCharLoaded).catch(onError);
  };

  marvelService = new MarvelService();

  onCharListLoading = () => {
    this.setState({
      newItemLoading: true,
    });
  };

  onCharLoading = () => {
    this.setState({
      loading: true,
    });
  };

  onCharLoaded = (newChar) => {
    this.setState(({ chars }) => ({
      chars: newChar,
      loading: false,
      newItemLoading: false,
    }));
  };

  onCharAddLoaded = (newChar) => {
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

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharAddLoaded)
      .catch(this.onError);
  };

  updateChars = () => {
    this.setState({ error: false });
    this.onCharLoading();
    this.marvelService
      .getAllCharacters()
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  CharEl = (items) => {
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
          ref={this.setRef}
          tabIndex={0}
          className="char__item"
          key={id}
          onClick={() => {
            this.props.onCharSelected(id);
            this.focusOnItem(i);
          }}
          onKeyPress={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              this.props.onCharSelected(id);
              this.focusOnItem(i);
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

  render() {
    const { chars, loading, error, newItemLoading, offset, charEnded } =
      this.state;
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
