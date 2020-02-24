import { combineReducers } from 'redux';
import {
    quickviewPrice,
    quickviewOffer,
    quickviewPayment,
    quickviewImages,
    quickviewAvailabled,
    quickviewSaleable,
    quickviewSkuSelected,
    isBuy,
    buyFinish,
    buyError

} from './quickview';
import {
    minicart,
    session
} from './minicart';

export default combineReducers({
    quickviewPrice,
    quickviewOffer,
    quickviewPayment,
    quickviewImages,
    quickviewAvailabled,
    quickviewSaleable,
    quickviewSkuSelected,
    isBuy,
    buyFinish,
    buyError,

    minicart,
    session
});