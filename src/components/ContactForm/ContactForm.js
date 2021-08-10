import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './ContactForm.module.scss';

function ContactForm({ onSubmitForm }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameId = uuidv4();
  const numberId = uuidv4();

  const handleChange = event => {
    // console.log(event);
    console.log(event.currentTarget.value);
    const { name, value } = event.currentTarget;
    return { [name]: value };
  };

  const handleSubmit = event => {
    event.preventDefault();

    onSubmitForm(name, number);

    reset();
  };

  const reset = () => {
    return { name: '', number: '' };
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.labelName} htmlFor={nameId}>
        Name
        <input
          type="text"
          value={name}
          onChange={handleChange}
          id={nameId}
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
      </label>
      <label className={styles.labelNumber} htmlFor={numberId}>
        Number
        <input
          type="tel"
          value={number}
          onChange={handleChange}
          id={numberId}
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
        />
      </label>
      <button className={styles.button} tupe="submit">
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};

export default ContactForm;
