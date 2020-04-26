import { CHANGE_CAREER } from "../actions/constants";

const initialState = {
    career : "11-9013.03"
  };
  
export default function(state = initialState, action) {
    const { type, payload } = action;
    
    switch (type) {
        case CHANGE_CAREER:
            return {
                ...state,
                career: payload
            };
        default :
        {
            return state;
        }
    }
}
