import {
    LOAD_ERROR,
    LOAD_CLASSES
} from "../actions/constants";

const initialState = {
    classes : []
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOAD_CLASSES:
            return {
                ...state,
                classes: payload
            };
        case LOAD_ERROR:
        default :
        {
            return state;
        }
    }
}
