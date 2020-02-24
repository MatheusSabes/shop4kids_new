import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { minicartFetch } from "../../actions/index";
import Remove from '../remove/index.jsx';
import './css/index.styl';

class minicart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
    }
    open(event) {
        this.setState({ open: true });
        document.querySelector('html').classList.add('minicart--fixed');

        event.preventDefault();
        return false;
    }
    
    close(event) {
        if(event.target.classList.contains('minicart')
            || event.currentTarget.classList.contains('minicart__close')) {

            this.setState({open: false});
            document.querySelector('html').classList.remove('minicart--fixed');
        }
    }

    componentWillMount() {
        let buttons = document.querySelectorAll('[data-minicart-open]');
        Array.from(buttons).forEach(button => button.addEventListener('click', e => this.open(e)));

        this.props.fetch(this.props.id);
    }

    render() {
        let minicart = this.props.minicart;
        let main, footer = '';
        let total = '0,00';

        if(!parseInt(minicart.amount)) {
            main = <div className="minicart__empty">
                Seu carrinho está vazio.
            </div>;
        } else {

            total = minicart.products.map(cart => parseFloat(cart.price) * parseInt(cart.quantity));

            let aux = 0;
            total.forEach((item) => {
               aux += item;
            });

            total = aux;


            total = new Intl.NumberFormat('pt-br', {
                style: 'currency',
                currency: 'BRL'
            }).format(total);
            total = total.replace('R$', '');

            main = <ul className="minicart__list">
                {minicart.products.map((item, key) => {
                    let name = item.product_name;
                    let div = document.createElement("div");

                    div.innerHTML = name;
                    name = div.textContent || div.innerText || "";

                    let lastSlash = item.product_image.http.lastIndexOf('/') - 4;

                    let imageHttp = item.product_image.http.replace('http:', '');

                    let src = imageHttp.substr(0, lastSlash) + '90_' + imageHttp.substr(lastSlash);

                    let image = <img src={src} alt={name} />;
                    let price = (new Intl.NumberFormat('pt-br', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(item.price)).replace('R$', '');
                    let url = item.product_url.http.replace('http:', '');

                    return <li key={key} className="minicart__item">
                        <a className="minicart__link" href={url}>
                            <figure className="minicart__image">{image}</figure>
                            <span className="minicart__info">
                                <h2 className="minicart__name">{name}</h2>
                                <span className="minicart__details">
                                    <span className="minicart__price">R$ {price}</span>
                                    <span className="minicart__qty">Quantidade: {item.quantity}</span>
                                </span>
                                <Remove id={item.product_id} variant={parseInt(item.variant_id)} session={this.props.session}  />
                            </span>
                        </a>

                    </li>;
                })}
            </ul>;
            footer = <footer className="minicart__footer">
                <div className="minicart__total">
                    <span className="minicart__total-label">Valor total</span>
                    <span className="minicart__total-price">R$ {total}</span>
                </div>
                <a href={ '/loja/carrinho.php?loja=' + this.props.id } className="minicart__finish" onClick={ () => {location.href = '/loja/carrinho.php?loja=' + this.props.id} }>Finalizar Compra</a>
            </footer>;
        }


        return <section className={ this.state.open ? 'minicart minicart--actived' : 'minicart' } onClick={ e => this.close(e) }>
            <div className="minicart__container">
                <header className="minicart__header">
                    <button type="button" onClick={ e => this.close(e) }className="minicart__close">
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </button>
                    <h1 className="minicart__title">Meu Carrinho</h1>
                </header>

                <div className="minicart__main">
                    {main}
                </div>

                {footer}
            </div>
        </section>;
    }

}

minicart.propTypes = {
    session: PropTypes.string.isRequired,
    minicart: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        session: state.session,
        minicart: state.minicart
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetch: store => dispatch(minicartFetch(store))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(minicart);