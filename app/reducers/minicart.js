
export function minicart(state = {product: [], amount: 0, price: 0}, action) {
    switch (action.type) {
        case 'MINICART':
            return action.minicart;
        default:
            return state;
    }
}

export function session( state = '', action) {
    switch (action.type) {
        case 'SESSION':
            return action.session;
        default:
            return state;
    }
}