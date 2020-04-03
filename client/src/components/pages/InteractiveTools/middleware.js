
import { } from '../../../state-management/actions/constants';

const promiseMiddleware = store => next => action => {
    // Do Nothing for now.//
    next(action);
};

export { promiseMiddleware }