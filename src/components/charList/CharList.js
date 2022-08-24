import './charList.scss';
import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {
  constructor(props) {
    super(props);
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
  }

  componentWillUnmount() {
  
  }

  componentDidUpdate() {
  
  }

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
    this.setState(({ chars, offset }) => ({
      chars: [...chars, ...newChar],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
   
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
    const elements = items.map(({ id, name, thumbnail }) => {
      if (
        thumbnail ===
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
      ) {
        imgStyle = { objectFit: 'contain' };
      }

      return (
        <li
          className="char__item"
          key={id}
          onClick={() => {
            this.props.onCharSekected(id);
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
    const content = this.CharEl(chars);

    return (
      <div className="char__list">
        <ul className="char__grid">
          {errorMessage}
          {spinner}
          {content}
        </ul>
        <button
          className="button button__main button__long"
          disabled={newItemLoading}
          style={{ display: charEnded ? 'none' : 'block' }}
          onClick={() => this.onRequest(offset)}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}


export default CharList;
