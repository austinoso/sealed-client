import { API_ROOT } from '../../constants/index';

export function fetchChatMessages(chatId) {
	return (dispatch) => {
		dispatch({ type: 'START_ADDING_MESSAGES_REQUEST' });
		fetch(`${API_ROOT}/chats/${chatId}/messages`)
			.then((r) => r.json())
			.then(messages => dispatch({type: 'ADD_CHAT_MESSAGES', chat, messages}));
	};
}
