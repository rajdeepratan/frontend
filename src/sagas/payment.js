import { call, put, select, fork, takeLatest } from 'redux-saga/effects';
import * as api from 'services/api';
import * as actions from 'ducks/payment';
import { updateProfile } from 'ducks/profile';
import { load, loaded } from 'ducks/loading';
import { ToastContainer, toast } from 'react-toastify';
import { browserHistory } from 'react-router';

const toastConfig = {
  position: toast.POSITION.BOTTOM_LEFT,
  autoClose: 2000
};

const getProfile = state => state.getIn(['profile', 'profile']);


function* fetch(action) {
  try {
    yield put(load());
    const res = yield call(api.GET, `payment`);
    if(res.error)
      console.log(res.error);
    else
      yield put(actions.successPayment(res));
    yield put(loaded());
  } catch (error) {
    yield put(loaded());
    console.log('Failed to fetch doc', error);
    yield toast.error(error.message, toastConfig);
  }
}

function* create(action) {
  try {
    yield put(load());
    const res = yield call(api.POST, `payment`, action.payment);
    if(res.message)
      yield toast.error(res.message, toastConfig);
    else
      browserHistory.push('/dashboard');
    yield put(loaded());
  } catch (error) {
    yield put(loaded());
    console.log('Failed to fetch doc', error);
    yield toast.error(error.message, toastConfig);
  }

}

function* update(action) {
  try {
    yield put(load());
    const res = yield call(api.PUT, `payment/${action.id}`);
    if(res.error)
      console.log(res.error);
    else
      yield put(actions.successPayment(res));
    yield put(loaded());
  } catch (error) {
    yield put(loaded());
    console.log('Failed to fetch doc', error);
    yield toast.error(error.message, toastConfig);
  }

}

export function* watchFetch() {
  yield takeLatest(actions.FETCH, fetch);
}

export function* watchCreate() {
  yield takeLatest(actions.CREATE, create);
}

export function* watchUpdate() {
  yield takeLatest(actions.UPDATE, update);
}

export default function* rootSaga() {
  yield [
    fork(watchFetch),
    fork(watchCreate),
    fork(watchUpdate)
  ];
}
