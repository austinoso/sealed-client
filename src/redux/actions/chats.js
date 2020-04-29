export const setChatsState = (chats) => {
	return { type: 'SET_CHATS', payload: chats };
};

export const addChat = (chat) => {
	return { type: 'ADD_CHAT', payload: chat };
};

export const removeChat = (chat) => {
	return { type: 'REMOVE_CHAT', payload: chat };
};
