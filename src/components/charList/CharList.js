import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {
  state = {
    chars: [],
    loading: true,
    error: false,
  };
  marvelService = new MarvelService();

  onCharLoading = () => {
    this.setState({
      loading: true,
    });
  };

  onCharLoaded = (chars) => {
    let result = chars.data.results ? chars.data.results : [];
    this.setState({
      chars: result,
      loading: false,
    });
  };
  componentDidMount() {
    console.log('mount');
    this.updateChars();
  }

  componentWillUnmount() {
    console.log('unmount');
  }

  componentDidUpdate() {
    console.log('update');
  }

  updateChars = () => {
    const offset = Math.floor(Math.random() * 101);  
    console.log(offset);
    this.setState({ error: false });
    this.onCharLoading();
    this.marvelService
      .getAllCharacters(offset)
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
    const elements = items.map(({id, name, thumbnail}) => {
      if (
        `${thumbnail.path}.${thumbnail.extension}` ===
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
      ) {
        imgStyle = { objectFit: 'contain' };
      }

      return (
        <li className="char__item" key={id}>
          <img
            style={imgStyle}
            src={`${thumbnail.path}.${thumbnail.extension}`}
            alt={name}
          />
          <div className="char__name">{name}</div>
        </li>
      );
    });
    return elements;
  };

  render() {
    const { chars, loading, error } = this.state;
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
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
