import ErrorMessage from '../errorMessage/ErrorMessage';
import { useNavigate } from 'react-router-dom';

const Page404 = () => {
  const navigate = useNavigate();
  const onReturn = () => {
    navigate(-1);
  };

  return (
    <div>
      <ErrorMessage />
      <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>
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
  );
};

export default Page404;


