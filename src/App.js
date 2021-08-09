import React, { useState, useEffect } from 'react';
// import useLocalStorage from '../../hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';

function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? [],
  );
  const [filter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = text => {
    const contactsId = uuidv4();
    const add = { id: contactsId, name: text.name, number: text.number };

    const filterName = contacts.filter(contact =>
      contact.name.toLowerCase().includes(text.name.toLowerCase()),
    );

    if (filterName.length > 0) {
      alert(`${add.name} is already in contacts!`);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [add, ...contacts],
    }));
  };

  const changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const deleteContacts = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmitForm={formSubmitHandler} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContact={deleteContacts}
      />
    </div>
  );
}

export default App;
