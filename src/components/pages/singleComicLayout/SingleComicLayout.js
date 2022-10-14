import { Link, useParams } from 'react-router-dom';
import useMarvelService from '../../../services/MarvelService';
import { useState, useEffect } from 'react';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import Spinner from '../../spinner/Spinner'
import './singleComicLayout.scss';
import { Helmet } from 'react-helmet';


const SingleComicLayout = () => {
	const { loading, error, getComic, clearError } = useMarvelService();
  /* const { title, description, pageCount, thumbnail, language, price } = data; */

 const {comicId} = useParams()
 const [comic, setComic] = useState(null);

	const updateComics = () => {
    if (!comicId) {
      return;
    }
    clearError();
    getComic(comicId).then(onComicLoaded);
  };

	  useEffect(() => {
    updateComics();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

	 const onComicLoaded = (comic) => {
     setComic(comic);
   };

	 const errorMessage = error ? <ErrorMessage /> : null;
	 const spinner = loading ? <Spinner /> : null;
	 const content = !(loading || error || !comic) ? (
     <InitComicPage comic={comic} />
   ) : null;


  return (
    <div className="single-comic">
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};


 const InitComicPage = ({comic}) => {
   return (
     <>
       <Helmet>
         <meta name="description" content={`${comic.title} comics book`} />
         <title>{comic.title}</title>
       </Helmet>
       <img src={comic.image} alt={comic.title} className="single-comic__img" />
       <div className="single-comic__info">
         <h2 className="single-comic__name">{comic.title}</h2>
         <p className="single-comic__descr">{comic.description}</p>
         <p className="single-comic__descr">{comic.pageCount}</p>
         <p className="single-comic__descr">Language: {comic.language}</p>
         <div className="single-comic__price">{comic.price} $</div>
       </div>
       <Link to="/comics" className="single-comic__back">
         Back to all
       </Link>
     </>
   );
 };
export default SingleComicLayout;
