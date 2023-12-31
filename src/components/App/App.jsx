import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import { PhoneForm } from '../Form/PhoneForm';
import { ContactList } from '../ContactsList/ContactsList';
import { FilterField } from '../FilterField/FilterField';

import { Title, SubTitle } from './App.styled';

export const App = () => {
  const initialState = [
    { id: 'id-1', name: 'Rosie Simpson', tel: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', tel: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', tel: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', tel: '227-91-26' },
  ];

  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) || initialState;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const isExist = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isExist) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }

    setContacts(prevContacts => [
      ...prevContacts,
      { id: nanoid(), ...newContact },
    ]);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const visibleContact = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <Title>Phonebook</Title>
      <PhoneForm onAdd={addContact} />
      <SubTitle>Contacts</SubTitle>
      <FilterField filter={filter} setFilter={setFilter} />
      <ContactList contacts={visibleContact} onDelete={deleteContact} />
    </div>
  );
};
