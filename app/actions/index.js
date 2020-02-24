import axios from 'axios';
import '../polyfill/customEvent';

export function quickviewPrice(price) {
    return {
        type: 'QUICKVIEW_PRICE',
        price
    };
}

export function quickvieOffer(offer) {
    return {
        type: 'QUICKVIEW_OFFER',
        offer
    }
}
export function quickviewPayment(payment) {
    return {
        type: 'QUICKVIEW_PAYMENT',
        payment
    }
}


export function quickviewImages(images) {
    return {
        type: 'QUICKVIEW_IMAGES',
        images
    }
}

export function quickviewAvailabled(bool) {
    return {
        type: 'QUICKVIEW_AVAILABLED',
        availabled: bool
    }
}

export function quickviewSaleable(bool) {
    return {
        type: 'QUICKVIEW_SALEABLE',
        saleable: bool
    }
}

export function quickviewAttributes(price, offer, payment,images, availabled, saleable) {
    return (dispatch) => {
        dispatch(quickviewPrice(price));
        dispatch(quickvieOffer(offer));
        dispatch(quickviewPayment(payment));
        dispatch(quickviewImages(images));
        dispatch(quickviewAvailabled(availabled));
        dispatch(quickviewSaleable(saleable))
    }
}


export function setQuickviewSaleable(saleable) {
    return (dispatch) => {
        dispatch(quickviewSaleable(saleable))
    }
}

export function quickviewSkuSelected(sku) {
    return {
        type: 'QUICKVIEW_SKU_SELECTED',
        sku
    }
}

export function quickviewSetSkuSelected(sku) {
    return (dispatch) => {
        dispatch(quickviewSkuSelected(sku));
    }
}


export function addCart(cart) {
    let total = cart.length;
    let count = 0;

    return (dispatch) => {
        dispatch(isBuy(true));
        cart.forEach((item) => {
            axios.post('/web_api/cart/', { Cart: item })
                .then((response) => {
                    if(++count >= total) {
                        dispatch(isBuy(false));
                        dispatch(buyFinish(true));
                        const UPDATECART = new CustomEvent('UPDATECART', { detail: response.data });
                        window.dispatchEvent(UPDATECART);
                    }

                    return null;
                })
                .catch((error) => {
                    let msg = '';
                    Array.from(error.response.data.causes).forEach((err) => msg += err);
                    dispatch(isBuy(false));
                    dispatch(buyError(true, msg));
                });
        });
    };
}

export function isBuy(bool) {
    return {
        type: 'IS_BUY',
        isbuy: bool
    }
}

export function buyFinish(bool) {
    return {
        type: 'BUY_FINISH',
        buyfinish: bool
    }
}

export function buyError(error, msg) {
    return {
        type: 'BUY_ERROR',
        error,
        msg
    }
}

export function resetBuy() {
    return (dispatch) => {
        dispatch(buyFinish(false));
        dispatch(isBuy(false));
        dispatch(buyError(false, ''));
    }
}

export function minicart(minicart) {
    return {
        type: 'MINICART',
        minicart
    }
}

export function session(session) {
    return {
        type: 'SESSION',
        session
    }
}

export function minicartData(hash, cart) {
    return dispatch => {
        axios.get('/web_api/cart/' + hash)
            .then(response => response.data)
            .then(data => {
                cart['products'] = data.map(item => item.Cart);

                dispatch(minicart(cart));

                return null;
            });
    }
}

export function minicartFetch(store) {
    return (dispatch) => {
        axios.get('/nocache/app.php?loja=' + store)
            .then(response => response.data)
            .then(data => {
                let hash = data.hash;
                dispatch(session(data.hash));

                axios.get('/mvc/store/cart/count?loja='+store+'&hash='+hash)
                    .then(response => response.data)
                    .then(data => {
                        let cart = {};
                        // cart['products']    = data.cart.Products;
                        cart['price']       = data.cart.price;
                        cart['amount']      = parseInt(data.cart.amount);

                        // Update Amount
                        Array.from(document.querySelectorAll('[data-cart=amount-auaha]')).forEach(item => {
                            if(cart.amount == 1) {
                                item.innerHTML = '0' + cart.amount ;
                            } else if(cart.amount < 10) {
                                item.innerHTML = '0' + cart.amount;
                            } else {
                                item.innerHTML = cart.amount;
                            }
                        });
                        Array.from(document.querySelectorAll('[data-cart=price]')).forEach(item => item.innerHTML = cart.price);

                        if(cart.amount) dispatch(minicartData(hash, cart));
                        else {
                            cart['products'] = [];
                            dispatch(minicart(cart));
                        }
                    });

                return null;
            });
    }
}

