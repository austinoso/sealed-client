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
			return {
				...state,
				chats: state.chats.filter((chat) => chat.id !== action.payload.id),
			};
		case 'SET_CONTACTS':
			return {
				...state,
				contacts: action.payload,
			};
		case 'CANCEL_CONTACT_REQ':
			return {
				...state,
				contacts: {
					...state.contacts,
					sent: state.contacts.sent.filter(
						(contact) => contact.id !== action.payload
					),
				},
			};
		default:
			return state;
	}
}
