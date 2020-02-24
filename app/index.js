import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import axios from 'axios';
import config from './config.json';
import { minicartFetch } from "./actions/index";

const store = configureStore();

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
};
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
};

// Quickview
import Quickview from './components/quickview/index.jsx';
let buttons = Array.from(document.querySelectorAll('[data-quickview-button]'));

if(config.quickview.actived) {
    let rootQuickview = document.querySelector('[data-quickview]');
    // Buttons Quickview

    buttons.forEach(item => {
        let id = item.getAttribute('data-id');
        item.classList.add('button--quickview');
    });

    if (rootQuickview) {
        ReactDOM.render(
            <Provider store={store}>
                <Quickview/>
            </Provider>,
            rootQuickview
        );
    }
} else {
    buttons.forEach(item => item.remove());
}

// Minicart
import Minicart from './components/minicart/index.jsx';

if(config.minicart.actived) {
    let rootMinicart = document.querySelector('[data-minicart]');

    if (rootMinicart) {
        ReactDOM.render(
            <Provider store={store}>
                <Minicart id={rootMinicart.getAttribute('data-minicart')} />
            </Provider>,
            rootMinicart
        );
    }
}

// Listen for the event.
window.addEventListener('UPDATECART', function (e) {

    if(config.minicart.actived) {
        store.dispatch(minicartFetch(document.querySelector('html').getAttribute('data-store')));
    } else {
        axios.get('/web_api/cart/' + document.querySelector('html').getAttribute('data-session'))
            .then(response =>  response.data)
            .then(data => {
                let amount = data.map(cart => parseInt(cart.Cart.quantity)).reduce((valorAnterior, valorAtual) => valorAnterior + valorAtual );
                let price =  data.map(cart => parseFloat(cart.Cart.price) * parseInt(cart.Cart.quantity)).reduce((valorAnterior, valorAtual) => valorAnterior + valorAtual );

                price = new Intl.NumberFormat('pt-br', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(price);

                price = price.replace('R$', '');

                // Update Amount
                Array.from(document.querySelectorAll('[data-cart=amount]')).forEach(item => item.innerHTML = amount);
                Array.from(document.querySelectorAll('[data-cart=price]')).forEach(item => item.innerHTML = price);


                return null;
            }).catch(function (error) {
                console.log(error);
            });
    }

}, false);
