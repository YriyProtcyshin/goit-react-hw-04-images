import { useState } from 'react';
import css from './Searchbar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';

export function Searchbar({ onSubmit }) {
  const [input, setInput] = useState('');

  function handleChange(e) {
    setInput(e.target.value.toLowerCase());
  }

  function handleInput(event) {
    event.preventDefault();
    if (input.trim() !== '') {
      onSubmit(input.trim());
      setInput('');
    }
  }

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleInput}>
        <button type="submit" className={css.SearchForm_button}>
          <AiOutlineSearch />
          <span className={css.SearchForm_button_label}>Search</span>
        </button>
        <input
          className={css.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={input}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}
