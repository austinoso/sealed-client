import { API_ROOT } from '../../constants/index';

export const setChats = (chats) => {
	return { type: 'SET_CHATS', payload: chats };
};

export const addChat = (chat) => {
	return { type: 'ADD_CHAT', payload: chat };
};

export const removeChat = (chat) => {
	return { type: 'REMOVE_CHAT', payload: chat };
};

export const updateChat = (chat, newChat) => {
	return { type: 'UPDATE_CHAT', chat, newChat };
};

export const acceptChat = (chat) => {
	return { type: 'ACCEPT_CHAT', chat };
};

export function fetchChatMessages(chat) {
	return (dispatch) => {
		dispatch({ type: 'START_ADDING_MESSAGES_REQUEST' });
		fetch(`${API_ROOT}/chats/${chat.id}/messages`)
			.then((r) => r.json())
			.then((fetchedChat) =>
				dispatch({
					type: 'ADD_MESSAGES',
					chat,
					messages: fetchedChat.messages,
				})
			);
	};
}

export const addMessages = (chat, messages) => {
	return { type: 'ADD_MESSAGES', chat, messages };
};

export const addNewChat = (chat) => {
	return { type: 'ADD_NEW_CHAT', chat };
};
