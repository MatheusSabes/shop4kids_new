import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { quickviewAttributes, quickviewSetSkuSelected, resetBuy } from '../../actions';

class Variants extends Component {
    constructor(props) {
        super(props);

        this.state = {
            variants: [],
            selected: [],
            selects: [],
            type: [],
            filter: [],
            product: {
                price: 0,
                offer: 0,
                payment: '',
                images: []
            }
        };
    }

    init(data) {
        let variants = data.Variants.map(item => {
            let payment;
            if(item.Variant.payment_option_details.length) {
                payment = '<span>' + item.Variant.payment_option_details[0].plots + 'x</span> de <span>' + new Intl.NumberFormat('pt-br', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(item.Variant.payment_option_details[0].value) + '</span>';
            }
        
            return {
                id: item.Variant.id,
                skus: item.Variant.Sku,
                availabled: parseInt(item.Variant.available) == 1 ? true : false,
                price: item.Variant.price,
                offer: item.Variant.promotional_price,
                payment: payment,
                images: item.Variant.VariantImage.map(image => image.http.replace('http:', ''))
            }
        });

        let type = variants
            .map(variant => variant.skus.map(sku => sku.type));

        let aux = [];

        type.forEach((item) => {
            aux = aux.concat(item);
        });

        type = aux;


        type = type.filter((element,index,self) => index == type.indexOf(element));

        let selects = [];
        type.forEach((name, index) => {
            let options = this.options(name,variants);
            selects.push({ name, options, disabled: index <= 0 ? false : true });
        });

        this.setState({
            variants,
            type,
            selects,
            filter: variants,
            product: {
                price: this.props.price,
                offer: this.props.offer,
                payment: this.props.payment,
                images: this.props.images,
                availabled: this.props.availabled,
                saleable: this.props.saleable
            }
        });
    }

    componentWillMount() {
        axios.get('/web_api/variants/?product_id='+this.props.id)
            .then(request => request.data)
            .then(data => this.init(data));
    }

    options(type, variants=this.state.variants) {
        let skus = variants
            .map(variant => variant.skus);
        let options = skus;
        let aux = [];

        options.forEach((item) => {
            aux = aux.concat(item);
        });

        options = aux;
        options = options.filter(sku => sku.type == type).map(sku => sku.value);
        aux = options;

        options = options.filter((element,index) => index == aux.indexOf(element))
            .map(option => { 
                let image = '';

                skus.forEach(item => {
                    let isImage = item.filter(sku => sku.value == option && sku.image);

                    if(isImage.length) {
                        image = isImage[0].image.replace('http:','');
                    }
                });
            
                return {
                    value: option,
                    label: option,
                    image: image,
                    disabled: false,
                    selected: false
                }
            });

        return this.props.type == 'close' ? [].concat([{
            value: '',
            label: "Selecione",
            selected: true,
            image: '',
        }], options) : options;
    }

    filter(selects) {
        let filter = this.state.variants;

        selects.forEach(select => {
            filter = filter.filter(variant => variant.skus.filter(item => item.type == select.type && item.value == select.value).length > 0);
        });

        return filter;
    }

    change(index, value) {
        let selects = this.state.selects;
        let selected = this.state.selected;
        let count = this.state.selects.length - 1;
        let has = selected.filter(item => item.type == selects[index].name);
        let filter = [];

        // Default value
        let price = this.state.product.price;
        let offer = this.state.product.offer;
        let payment = this.state.product.payment;
        let images = this.state.product.images;
        let availabled = this.state.product.availabled;
        let saleable    = this.state.product.saleable;

        this.props.resetBuy();

        selects.forEach((select, key) => {
            if(index == key)
                select.options.filter(item => {
                    if(item.value == value) item.selected = true;
                    else                    item.selected = false;
                    return true;
                });
            else if(key > index) {
                select.disabled = true;
                select.options.filter(item => {
                    if (item.value == '')   item.selected = true;
                    else                    item.selected = false;
                    return true;
                });
            }
        });

        if((index + 1) <= count) selected = selected.slice(index, count);

        if (has.length) {
            selected = selected.map(item => {
                if (item.type == selects[index].name) return {type: selects[index].name, value};
                else return {type: item.type, value: item.value};
            });
        } else selected.push({type: selects[index].name, value});

        if(value == "") {
            if ((index + 1) <= count) {
                this.props.setSku({});
                availabled = false;
                selects[index + 1].disabled = true;
                selects[index + 1].options.forEach((option, index) => {
                    if(index == 0)  option.selected = true;
                    else            option.selected = false;
                });
            }
        } else {

            if ((index + 1) <= count) {
                let variants = this.filter(selected);
                selects[index + 1].disabled = false;
                selects[index + 1].options = this.options(selects[index + 1].name, variants);
            }

        }

        if (selected.length == this.state.type.length) {
            filter = this.filter(selected);

            if(filter.length) {
                price       = parseFloat(filter[0].price);
                offer       = parseFloat(filter[0].offer);
                payment     = filter[0].payment;
                images      = filter[0].images;
                availabled  = filter[0].availabled;
                saleable    = true;
                this.props.setSku(filter[0]);
            }


        }

        payment = payment ? payment : '';

        this.props.setAttributes(price, offer, payment, images, availabled, saleable);
        this.setState({ selects, selected, filter });
    }

    render() {
        let variants = this.state.variants;
        let selects = this.state.selects;

        if(!variants.length)
            return <div className="variants"></div>;

        if(this.props.type == 'close')
            return <div className="variants variants--close">
                {selects.map( (select, key) => <div key={key} className={ select.disabled ? 'disabled variant' : 'variant' }>
                    <label htmlFor={'variant-' + key}>{select.name}</label>
                    <select disabled={select.disabled} value={select.options.filter(item => item.selected)[0].value} onChange={(e) => { this.change(key, e.target.value) } } name={'variant-' + key} id={'variant-' + key}>
                        {select.options.map((option, index) => {
                            return <option disabled={option.disabled} key={index + 1} value={option.value}>{option.label}</option>
                        })}
                    </select>
                </div>)}
            </div>;
        else
            if(this.props.type == 'radio')
                return <div className="variants variants--radio">
                    {selects.map( (select, key) => <div key={key} className={ select.disabled ? 'disabled' : '' }>
                        <h3 className="variant__title">{select.name}</h3>
                        <div className="variant" aria-disabled={select.disabled}>
                            {select.options.map((option, index) => {
                                return <label key={'label-' + key + '-' + index} className="variant__item" aria-disabled={option.disabled} >
                                    <input className="variant__radio" type="radio" onChange={(e) => { this.change(key, e.target.value) } } name={ 'variant[' + key + ']'} disabled={option.disabled} checked={option.selected} key={index + 1} value={option.value} />
                                    { option.image 
                                            ? <span className="variant__label variant__label--image"><img src={option.image} alt={option.label}/></span> 
                                            : <span className="variant__label">{option.label}</span> }
                                </label>;
                            })}
                        </div>
                    </div>)}
                </div>;
            else
                return <div className="variants variants--open">
                    {selects.map( (select, key) => <div key={key} className={ select.disabled ? 'disabled' : '' }>
                        <h3 className="variant__title">{select.name}</h3>
                        <div className="variant" aria-disabled={select.disabled}>
                            {select.options.map((option, index) => {

                                return <label key={'label-' + key + '-' + index}  className="variant__item" aria-disabled={option.disabled} >
                                    <input className="variant__radio" type="radio" onChange={(e) => { this.change(key, e.target.value) } } name={ 'variant[' + key + ']'} disabled={option.disabled} checked={option.selected} key={index + 1} value={option.value} />
                                    { option.image 
                                            ? <span className="variant__label variant__label--image "><img src={option.image} alt={option.label}/></span> 
                                            : <span className="variant__label">{option.label}</span> }
                                </label>;
                            })}

                        </div>
                    </div>)}
                </div>;
    }

}


Variants.propTypes = {
};

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAttributes   : (price,offer,payment,images,availabled, saleable) => dispatch(quickviewAttributes(price,offer,payment,images,availabled,saleable)),
        setSku          : (sku) => dispatch(quickviewSetSkuSelected(sku)),
        resetBuy        : () => dispatch(resetBuy())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Variants);
