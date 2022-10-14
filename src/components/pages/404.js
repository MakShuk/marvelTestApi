import ErrorMessage from '../errorMessage/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Page404 = () => {
  const navigate = useNavigate();
  const onReturn = () => {
   navigate('/');
  };

  return (
    <>
      <Helmet>
        <meta name="description" content="Page doesn't exist" />
        <title>Page doesn't exist</title>
      </Helmet>
      <div>
        <ErrorMessage />
        <p
          style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}
        >
          Page doesn't exist
        </p>
        <div
          style={{
            display: 'block',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '24px',
            marginTop: '30px',
          }}
          onClick={onReturn}
        >
          Back to main page
        </div>
      </div>
    </>
  );
};

export default Page404;


