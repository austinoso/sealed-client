export const setContacts = (contacts) => {
	return { type: 'SET_CONTACTS', payload: contacts };
};

export const removeContact = (list, contactId) => {
	return { type: 'REMOVE_CONTACT', list, contactId };
};

export const addContact = (list, contact) => {
	return { type: 'ADD_CONTACT', list, contact };
};
