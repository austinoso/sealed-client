import actionCable from 'actioncable';

export const API_ROOT = 'http://localhost:3000';
export const API_WS_ROOT = 'ws://localhost:3000/cable';
export const HEADERS = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
	Authorization: `Bearer ${localStorage.token}`,
};

export const cable = actionCable.createConsumer(
	`${API_WS_ROOT}?token=${localStorage.token}`
);
