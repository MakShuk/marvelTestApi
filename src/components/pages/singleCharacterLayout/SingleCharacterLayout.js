import './singleCharacterLayout.scss';
import { useParams } from 'react-router-dom';

const SingleCharacterLayout = ({ data }) => {
  const { charName, description, thumbnail } = useParams();
  return (
    <div className="single-comic">
      <img
        src={thumbnail.replaceAll('~', '/')}
        alt={charName}
        className="single-comic__char-img"
      />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{charName}</h2>
        <p className="single-comic__descr">{description}</p>
      </div>
    </div>
  );
};

export default SingleCharacterLayout;
