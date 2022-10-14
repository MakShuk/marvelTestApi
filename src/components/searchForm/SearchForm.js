import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';

import './searchForm.scss';

const SearchForm = () => {
  const [charStatus, setCharStatus] = useState(false);

  const onRequest = (characterName) => {
    setCharStatus(false);
    clearError();
    getCharacterByName(characterName.search).then(searchResult);
  };

  const searchResult = (result) => {
    setCharStatus(result);
  };

  const { loading, error, clearError, getCharacterByName } = useMarvelService();

  const ErrorLoadingMessage = () => {
    if (error) {
      return <div className="char__error">Error server...</div>;
    } else {
      return null;
    }
  };

  const LoadingMessage = () => {
    if (loading) {
      return <div className="char__error">Loading...</div>;
    } else {
      return null;
    }
  };


  const GoToCharPage = () => {
    if (charStatus) {
      const { charName, description, thumbnail } = charStatus;
      return (
        <>
          <div className="char__question">
            There is! Visit {charName} page ?
          </div>
          <Link
            className="button button button__secondary"
            to={`/character/${charName}/${description}/${thumbnail.replaceAll(
              '/',
              '~'
            )}`}
          >
            <div className="inner">Wiki</div>
          </Link>
        </>
      );
    } else {
      return null;
    }
  };

  const NotFontMessage = () => {
    if (charStatus == null) {
      setTimeout(() => {
        setCharStatus(false);
      }, 1500);

      return (
        <>
          <div className="char__error">Сharacter not found</div>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <Formik
      initialValues={{
        search: '',
      }}
      validationSchema={Yup.object({
        search: Yup.string()
          .min(4, 'Minimum 4 characters to fill')
          .required('Search cannot be empty!'),
      })}
      onSubmit={(characterName) => onRequest(characterName)}
    >
      <Form className="char__search">
        <h2 className="char__text">Or finde character by name:</h2>
        <Field
          className="char__input"
          type="text"
          name="search"
          id="search"
          placeholder="Enter name"
        ></Field>
        <button className="button char__btn button button__main" type="submit">
          <div className="inner">finde</div>
        </button>
        <ErrorMessage component="div" className="char__error" name="search" />
        <GoToCharPage />
        <NotFontMessage />
        <ErrorLoadingMessage />
        <LoadingMessage />
      </Form>
    </Formik>
  );
};
export default SearchForm;
