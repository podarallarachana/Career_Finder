import axios from "axios";
import {
    LOAD_ERROR,
    LOAD_CLASSES
} from "./constants";

// LOAD USER
export const getClasses = () => async dispatch => {
    try {
        const res = await axios.get("/api/class/classes");
        dispatch({
            type: LOAD_CLASSES,
            payload: res
        });
    } catch (err) {
        dispatch({
            type: LOAD_ERROR
        });
    }
};