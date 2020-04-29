export default function userInfoReducer(
	state = {
		username: [],
	},
	action
) {
	switch (action.type) {
		case 'SET_USERNAME':
			return {
                ...state,
                username: 
			};

		default:
			return state;
	}
}
