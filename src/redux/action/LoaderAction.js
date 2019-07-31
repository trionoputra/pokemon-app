import {CONSTANT} from '../../helper';
export const loader = (show) => {
    return {
        type: CONSTANT.KEY_LOADER_TOGGLE,
        isShow: show,
    };
};