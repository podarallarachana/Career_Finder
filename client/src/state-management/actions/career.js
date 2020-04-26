import { CHANGE_CAREER} from "./constants";

export function setCareer(payload) {
    return {type: CHANGE_CAREER, payload};
}
