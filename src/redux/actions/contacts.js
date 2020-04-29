export const setContacts = (contacts) => {
	return { type: 'SET_CONTACTS', payload: contacts };
};

export const cancelContactReq = (contact) => {
	return { type: 'CANCEL_CONTACT_REQ', payload: contact };
};
