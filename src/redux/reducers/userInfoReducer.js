const initialState = {
	user: localStorage.username ? localStorage.username : null,
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
				chats: [...state.chats, { ...action.payload }],
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

		case 'ADD_MESSAGES':
			const chatsList = state.chats;
			const chatIndex = chatsList.findIndex(
				(chat) => chat.id === action.chat.id
			);
			const chat = chatsList.find((chat) => chat.id === action.chat.id);
			chatsList.splice(chatIndex, 1, {
				...chat,
				messages: chat.messages.concat(action.messages),
			});

			return {
				...state,
				chats: [...chatsList],
			};

		case 'ACCEPT_CHAT':
			const cList = state.chats;
			const cIndex = cList.findIndex((chat) => chat.id === action.chat.id);
			const c = cList.find((chat) => chat.id === action.chat.id);
			cList.splice(cIndex, 1, {
				...c,
				accepted: true,
			});

			return { ...state, chats: [...cList] };

		case 'SET_ACTIVE_CHAT':
			return { ...state, activeChat: action.chat };

		default:
			return state;
	}
}
