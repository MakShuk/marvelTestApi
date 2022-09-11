class MarvelService {
  _apiBase = `https://gateway.marvel.com:443/v1/public/`;
  _apiKey = `apikey=6b5977a7a5b7bf2c502daa9396bd77c3`;
  _baseOffset = 21;

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = async (offset = this._baseOffset) => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`
    );
    return res.data.results.map(this._transformCharacter);
  };

  getAllComics = async (offset = this._baseOffset) => {
    const res = await this.getResource(
      `${this._apiBase}comics?limit=9&offset=${offset}&${this._apiKey}`
    );
    return res.data.results.map(this._transformComics);
  };

  getCharacter = async (id) => {
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    );
    return this._transformCharacter(res.data.results[0]);
  };

  _transformCharacter = (char) => {
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

  _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      image: comics.images[0]
        ? comics.images[0].path + '.' + comics.images[0].extension
        : 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg',
      price: comics.prices[0].price,
    };
  };
}

export default MarvelService;
