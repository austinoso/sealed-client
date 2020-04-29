const initialState = {
	username: localStorage.username ? localStorage.username : null,
	chats: [],
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
		default:
			return state;
	}
}
