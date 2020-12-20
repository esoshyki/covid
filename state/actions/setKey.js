import { CHANGE_KEY } from './actions';

const setKey = (key) => dispatch => {
  dispatch({type: CHANGE_KEY, payload: key})
}

export default setKey