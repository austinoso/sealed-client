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
				chats: state.chats.splice(
					state.chats.findIndex((chat) => chat.id === action.payload.id) - 1,
					1
				),
			};
		case 'SET_CONTACTS':
			return {
				...state,
				contacts: action.payload,
			};
		default:
			return state;
	}
}
