import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import ContactForm from "./components/ContactForm";
import Filter from "./components/Filter";
import ContactList from "./components/ContactList";
class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  //  contacts: [
  //   {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
  //   {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
  //   {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
  //   {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);
    console.log(parsedContacts);
    console.log(contacts);

    if (parsedContacts) {
      console.log("parsedContacts", parsedContacts);
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      console.log("Обновилось поле contacts, записываю todos в хранилище");
      localStorage.setItem("contacts", JSON.stringify(nextContacts));
    }
  }

  formSubmitHandler = (text) => {
    // console.log('text:', text)
    const contactsId = uuidv4();
    const { contacts } = this.state;
    const add = { id: contactsId, name: text.name, number: text.number };

    const filterName = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(text.name.toLowerCase())
    );

    if (filterName.length > 0) {
      alert(`${add.name} is already in contacts!`);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [add, ...contacts],
    }));
  };

  changeFilter = (e) => {
    // console.log(e.currentTarget.value)
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContacts = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  render() {
    const { filter } = this.state;
    // const VisibleContacts = this.getVisibleContacts();
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmitForm={this.formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={this.getVisibleContacts()}
          onDeleteContact={this.deleteContacts}
        />
      </div>
    );
  }
}

export default App;
