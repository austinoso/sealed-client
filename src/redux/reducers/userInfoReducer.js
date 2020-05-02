import { act } from 'react-dom/test-utils';

const initialState = {
	username: localStorage.username ? localStorage.username : null,
	chats: [],
	contacts: {},
};

export default function userInfoReducer(state = initialState, action) {
	switch (action.type) {
		case 'SET_USERNAME':
			return {
				...state,
				username: action.payload,
			};
		case 'SET_CHATS':
			return {
				...state,
				chats: action.payload,
			};
		case 'ADD_CHAT':
			return {
				...state,
				chats: [...state.chats, action.payload],
			};
		case 'REMOVE_CHAT':
			console.log('hit');
			return {
				...state,
				chats: state.chats.filter((chat) => chat.id !== action.payload.id),
			};
		case 'SET_CONTACTS':
			return {
				...state,
				contacts: action.payload,
			};
		case 'REMOVE_CONTACT':
			return {
				...state,
				contacts: {
					...state.contacts,
					[action.list]: state.contacts[action.list].filter(
						(contact) => contact.id !== action.contactId
					),
				},
			};
		case 'ADD_CONTACT':
			return {
				...state,
				contacts: {
					...state.contacts,
					[action.list]: [...state.contacts[action.list], action.contact],
				},
			};
		default:
			return state;
	}
}
