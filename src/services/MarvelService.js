import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
  const {request, clearError, process, setProcess } =
    useHttp();
  const _apiBase = `https://gateway.marvel.com:443/v1/public/`;
  const _apiKey = `apikey=6b5977a7a5b7bf2c502daa9396bd77c3`;
  const _baseOffset = 21;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };

  const getAllComics = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}comics?limit=9&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformComics);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 210)}...`
        : 'There is no description for this character',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      pageCount: comics.pageCount
        ? `${comics.pageCount} p.`
        : 'No information about the number of pages',
      language: comics.textObjects.language || 'en-us',
      description: comics.description
        ? `${comics.description.slice(0, 220)}...`
        : 'There is no description for this character',
      title: comics.title,
      image: comics.images[0]
        ? comics.images[0].path + '.' + comics.images[0].extension
        : 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg',
      price: comics.prices[0].price,
    };
  };

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };

  const getCharacterByName = async (name) => {
    // ${_apiBase}comics/characters?name={name}&${_apiKey}
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);

    if (!res.data.results[0]) return null;

    const {
      name: charName,
      description,
      thumbnail,
    } = _transformCharacter(res.data.results[0]);
    return { charName, description, thumbnail };
  };

  return {
    process,
    setProcess,
    clearError,
    getAllCharacters,
    getCharacter,
    getAllComics,
    getComic,
    getCharacterByName,
  };
};

export default useMarvelService;
