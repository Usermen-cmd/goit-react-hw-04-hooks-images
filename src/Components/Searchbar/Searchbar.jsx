import { useState } from 'react';
import PropTypes from 'prop-types';
//Styles
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styles';

const Searchbar = ({ onSubmitForm }) => {
  const [value, setValue] = useState('');

  const onInputChange = event => {
    const currentValue = event.target.value;
    setValue(currentValue);
  };

  const onSubmit = event => {
    const normalizeString = value.trim();
    event.preventDefault();
    onSubmitForm(normalizeString);
    setValue('');
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={onSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          name="name"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={onInputChange}
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};

export default Searchbar;
