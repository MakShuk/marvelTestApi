import { Link, useParams } from 'react-router-dom';
import useMarvelService from '../../../services/MarvelService';
import { useState, useEffect } from 'react';
import setContent from '../../../utils/setContent';
import { Helmet } from 'react-helmet';

import './singleComicLayout.scss';

const SingleComicLayout = () => {
	const { getComic, clearError, process, setProcess } = useMarvelService();
  
 const {comicId} = useParams()
 const [comic, setComic] = useState(null);

	const updateComics = () => {
    if (!comicId) {
      return;
    }
    clearError();
    getComic(comicId)
      .then(onComicLoaded)
      .then(() => setProcess('confirmed'));;
  };
	  useEffect(() => {
    updateComics();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

	 const onComicLoaded = (comic) => {
     setComic(comic);
   };


  return (
    <div className="single-comic">
      {setContent(process, InitComicPage, comic)}
    </div>
  );
};


 const InitComicPage = ({ data }) => {
   const { title, image, description, pageCount, price, language } = data;
   return (
     <>
       <Helmet>
         <meta name="description" content={`${title} comics book`} />
         <title>{title}</title>
       </Helmet>
         <img src={image} alt={title} className="single-comic__img" />
       <div className="single-comic__info">
         <h2 className="single-comic__name">{title}</h2>
         <p className="single-comic__descr">{description}</p>
         <p className="single-comic__descr">{pageCount}</p>
         <p className="single-comic__descr">Language: {language}</p>
         <div className="single-comic__price">{price} $</div>
       </div>
       <Link to="/comics" className="single-comic__back">
         Back to all
       </Link>
     </>
   );
 };
export default SingleComicLayout;
