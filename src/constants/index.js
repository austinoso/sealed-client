import actionCable from 'actioncable';

export const API_ROOT = 'https://sealed-api.herokuapp.com';
export const API_WS_ROOT = 'wss://sealed-api.herokuapp.com/cable';
export const HEADERS = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
	Authorization: `Bearer ${localStorage.token}`,
};

export const cable = actionCable.createConsumer(
	`${API_WS_ROOT}?token=${localStorage.token}`
);
