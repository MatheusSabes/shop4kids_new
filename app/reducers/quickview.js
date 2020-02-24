

export function quickviewPrice(state = 0, action) {
    switch (action.type) {
        case 'QUICKVIEW_PRICE':
            return action.price;
        default:
            return state;
    }
}

export function quickviewOffer(state = 0, action) {
    switch (action.type) {
        case 'QUICKVIEW_OFFER':
            return action.offer;
        default:
            return state;
    }
}

export function quickviewPayment(state = '', action) {
    switch (action.type) {
        case 'QUICKVIEW_PAYMENT':
            return action.payment;

        default:
            return state;
    }
}

export function quickviewImages(state = [], action) {
    switch (action.type) {
        case 'QUICKVIEW_IMAGES':
            return action.images;
        default:
            return state;
    }
}

export function quickviewAvailabled(state = true, action) {
    switch (action.type) {
        case 'QUICKVIEW_AVAILABLED':
            return action.availabled;
        default:
            return state;
    }
}

export function quickviewSaleable(state = false, action) {
    switch (action.type) {
        case 'QUICKVIEW_SALEABLE':
            return action.saleable;
        default:
            return state;
    }
}

export function quickviewSkuSelected(state = {}, action) {
    switch (action.type) {
        case 'QUICKVIEW_SKU_SELECTED':
            return action.sku;
        default:
            return state;
    }
}


export function isBuy(state = false, action) {
    switch (action.type) {
        case 'IS_BUY':
            return action.isbuy;
        default:
            return state;
    }
}

export function buyFinish(state = false, action) {
    switch (action.type) {
        case 'BUY_FINISH':
            return action.buyfinish;
        default:
            return state;
    }
}

export function buyError(state = {error: false, msg: ''}, action) {
    switch (action.type) {
        case 'BUY_ERROR':
            return {error: action.error, msg: action.msg};
        default:
            return state;
    }
}


