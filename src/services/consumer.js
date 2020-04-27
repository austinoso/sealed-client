import ActionCable from 'actioncable';
import { API_WS_ROOT } from '../constants/index';

function consumer() {
	return ActionCable.createConsumer(API_WS_ROOT);
}

export default consumer();
