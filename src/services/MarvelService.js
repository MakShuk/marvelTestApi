class MarvelService {
  _apiBase = `https://gateway.marvel.com:443/v1/public/`;
  _apiKey = `apikey=6b5977a7a5b7bf2c502daa9396bd77c3`;
  getResourse = async (url) => {
    let response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.staus}`);
    }
    return await response.json();
  };

  getAllCharacters = (offset = 20) => {
    let url = `${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`;
    return this.getResourse(url);
  };

  getCharacter = (id) => {
    let url = `${this._apiBase}characters/${id}?${this._apiKey}`;
    return this.getResourse(url);
  };
}

export default MarvelService
