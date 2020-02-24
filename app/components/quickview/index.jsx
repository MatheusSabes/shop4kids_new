import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { quickviewAttributes, addCart, resetBuy, setQuickviewSaleable } from '../../actions';
import Images from '../images/index.jsx';
import Prices from '../prices/index.jsx';
import Variants from '../variants/index.jsx';
import config from '../../config.json';

import './css/index.styl';

class quickview extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: undefined,
            visible: false,
            name: '',
            sku: '',
            description: '',
            hasVariants: false,
            availabled: true,
            saleable: false,
            qtd: 1,
            store: 0,
            hash: 0,
            url: ''
        };
    }

    close(event) {
        if(event.target.classList.contains('quickview')
            || event.target.classList.contains('quickview__button--close')
            || event.target.classList.contains('quickview__button--continue')) {

            this.setState({
                id: undefined,
                visible: false,
                name: '',
                sku: '',
                descriptionSmall: '',
                hasVariants: false,
                availabled: true,
                saleable: false,
                qtd: 1,
                store: 0,
                hash: 0,
                url: ''
            });

            this.props.setAttributes(0, 0 ,'', [], true, false);
            document.querySelector('body').classList.remove('quickview--loaded');
        }
    }

    init(button) {
        let id = button.getAttribute('data-id');
        
        this.setState({ id });
        this.props.resetBuy();

        axios.get('/web_api/products/' + id)
            .then(response => response.data)
            .then(data => {
                let price   = parseFloat(data.Product.price);
                let offer   = parseFloat(data.Product.promotional_price);
                let payment = data.Product.payment_option;
                let images  = data.Product.ProductImage.map(image => (image.https).replace('https:', ''));
                let availabled  = parseInt(data.Product.available) == 1 ? true : false;
                let saleable    = false;

                if(data.Product.payment_option_details.length) {
                    payment = '<span>' + data.Product.payment_option_details[0].plots + 'x</span> de <span>' + new Intl.NumberFormat('pt-br', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(data.Product.payment_option_details[0].value) + '</span>';
                }

                this.setState({
                    id: id,
                    visible: true,
                    name: data.Product.name,
                    descriptionSmall: data.Product.description_small,
                    sku: data.Product.id,
                    hasVariants: parseInt(data.Product.has_variation) == 1 ? true : false,
                    store: document.querySelector('html').getAttribute('data-store'),
                    hash: document.querySelector('html').getAttribute('data-session'),
                    url: data.Product.url.http.replace('http:', '')
                });

                this.props.setAttributes(price, offer ,payment, images, availabled, saleable);
                document.querySelector('body').classList.add('quickview--loaded');

            });


    }

    updateInputQtd(event) {
        let qtd = event.target.value;
        if(qtd < 1) qtd = 1;

        this.setState({ qtd });
        this.props.resetBuy();
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.availabled && !this.state.hasVariants)
            this.props.setSaleable(true);
    }

    componentWillMount() {
        let buttons = document.querySelectorAll('[data-quickview-button]');
        Array.from(buttons).forEach(button => button.addEventListener('click', e => this.init(e.currentTarget)));

        if(this.props.availabled && !this.state.hasVariants)
            this.props.setSaleable(true);
    }

    buy(event) {
        let cart = {
            session_id: this.state.hash,
            product_id: this.state.id,
            quantity: this.state.qtd,
            variant_id: 0
        };

        if(this.state.hasVariants) {
            if (this.props.skuSelected && this.state.qtd) {
                cart.variant_id = this.props.skuSelected.id;
            }
        }

        this.props.addCart([cart]);
    }

    more() {
        let { qtd } = this.state;
        this.setState({ qtd: ++qtd });
    }

    less() {
        let { qtd } = this.state;
        if((qtd - 1) > 0) qtd--;
        this.setState({ qtd });
    }
    
    render() {

        let variants;

        if(this.state.hasVariants)
            variants = <Variants
                            id={this.state.id}
                            price={this.props.price}
                            offer={this.props.offer}
                            payment={this.props.payment}
                            images={this.props.images}
                            availabled={this.props.availabled}
                            saleable={this.props.saleable}
                            type={config.quickview.variants}/>;

        if(!this.state.visible)
            return <div aria-hidden={!this.state.visible} className="quickview" id="quickview" style={{ "display": "none" }}></div>

        return <section onClick={event =>{ this.close(event) }} aria-hidden={!this.state.visible} className="quickview" id="quickview" >
            {this.props.isFinish || <div className="quickview__container">
                <button onClick={event =>{ this.close(event) }} className="quickview__button quickview__button--close">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="298 388 16 16"> <path d="M307.416,395.993l1.414-1.414c0.196-0.196,0.196-0.512,0-0.707l-0.707-0.707 c-0.195-0.195-0.511-0.196-0.707,0l-1.414,1.414l-1.414-1.413c-0.196-0.196-0.512-0.196-0.708-0.001l-0.707,0.707 c-0.195,0.195-0.195,0.512,0.001,0.708l1.414,1.414l-1.411,1.411c-0.195,0.195-0.195,0.512,0,0.707l0.707,0.707 c0.196,0.195,0.512,0.196,0.707,0l1.411-1.41l1.421,1.421c0.196,0.196,0.513,0.196,0.708,0.001l0.707-0.707 c0.195-0.195,0.195-0.513,0-0.708L307.416,395.993z M306,388c-4.418,0-8,3.582-8,8s3.582,8,8,8c4.419,0,8-3.582,8-8 C314,391.582,310.419,388,306,388z M306,402.499c-3.59,0-6.5-2.91-6.5-6.5c0-3.59,2.91-6.5,6.5-6.5s6.5,2.91,6.5,6.5 C312.5,399.589,309.59,402.499,306,402.499z"/> </svg>
                </button>

                <Images images={this.props.images} />

                <div className="quickview__main">
                    <h1 className="quckview__name">{this.state.name}</h1>

                    <h2 className="quickivew__sku">Código: {this.state.sku}</h2>

                    {!this.props.availabled ||
                    <Prices price={this.props.price} offer={this.props.offer} payment={this.props.payment}/>
                    }

                    {variants}

                    {!this.props.availabled ||
                    <div className="quickview__actions">
                        <div className="quickview__quantity">
                            <button onClick={ this.less.bind(this) } type="button" className="qtds__button qtds__button--less">-</button>
                            <input disabled={!this.props.saleable} type="number" className="quickview__qtd" value={this.state.qtd} onChange={(e) => {this.updateInputQtd(e)}} />
                            <button onClick={ this.more.bind(this) } type="button" className="qtds__button qtds__button--more">+</button>
                        </div>
                        <button disabled={!this.props.saleable} className="quickview__button--addcart" onClick={(e) => {this.buy(e)}}>Comprar</button>
                        <a href={this.state.url} className="quickview__link quickview__link--more">Ver mais detalhes</a>
                    </div>
                    }

                    {!this.props.isError.error || <div className="quickview__error">
                        {this.props.isError.msg}
                    </div>}

                    {this.props.availabled ||
                    <div className="quickview__unavailable">
                        No momento este produto está indisponível.
                    </div>
                    }
                </div>
            </div>}
            {!this.props.isFinish || <div className="quickview__container quickview__finish">
                <button onClick={event =>{ this.close(event) }} className="quickview__button quickview__button--close">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><title>close</title><g id="Camada_2" data-name="Camada 2"><g id="Layer_1" data-name="Layer 1"><path d="M75.19,50,98.68,26.51a4.51,4.51,0,0,0,0-6.38L79.87,1.32a4.51,4.51,0,0,0-6.38,0L50,24.81,26.51,1.32a4.51,4.51,0,0,0-6.38,0L1.32,20.13a4.51,4.51,0,0,0,0,6.38L24.81,50,1.32,73.49a4.51,4.51,0,0,0,0,6.38L20.13,98.68a4.51,4.51,0,0,0,6.38,0L50,75.19,73.49,98.68a4.51,4.51,0,0,0,6.38,0L98.68,79.87a4.51,4.51,0,0,0,0-6.38Z"/></g></g></svg>
                </button>
                <div className="quckview__actions">
                    <button onClick={event =>{ this.close(event) }} className="quickview__button quickview__button--continue" type="button">Continuar Comprando</button>
                    <a className="quickview__button quickview__button--finish" href={ '/loja/carrinho.php?loja='+this.state.store+'&transID='+this.state.hash+'&hash='+this.state.hash }>Finalizar Compra</a>
                </div>
            </div>}
        </section>;
    }

}

quickview.propTypes = {
    price: PropTypes.number.isRequired,
    offer: PropTypes.number.isRequired,
    payment: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    availabled: PropTypes.bool.isRequired,
    saleable: PropTypes.bool.isRequired,
    skuSelected: PropTypes.object,
    isBuy: PropTypes.bool.isRequired,
    isFinish: PropTypes.bool.isRequired,
    isError: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        price: state.quickviewPrice,
        offer: state.quickviewOffer,
        payment: state.quickviewPayment,
        images: state.quickviewImages,
        availabled: state.quickviewAvailabled,
        saleable: state.quickviewSaleable,
        skuSelected: state.quickviewSkuSelected,
        isBuy: state.isBuy,
        isFinish: state.buyFinish,
        isError: state.buyError
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAttributes: (price,offer,payment, images, availabled, saleable) => dispatch(quickviewAttributes(price,offer,payment, images, availabled, saleable)),
        addCart: (cart) => dispatch(addCart(cart)),
        resetBuy: () => dispatch(resetBuy()),
        setSaleable: (saleable) => dispatch(setQuickviewSaleable(saleable))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(quickview);
