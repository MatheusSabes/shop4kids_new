import React, { Component } from 'react';

export default class Prices extends Component {

    render() {

        if(parseInt(this.props.offer) > 0)
            return <div className="prices">
                <span className="from">{
                    new Intl.NumberFormat('pt-br', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(this.props.price)}</span>
                <span className="to">{
                    new Intl.NumberFormat('pt-br', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(this.props.offer)}</span>
                <span className="payment" dangerouslySetInnerHTML={{__html: this.props.payment}} ></span>
            </div>;

        return <div className="prices">
            <span className="from"></span>
            <span className="to">{
                new Intl.NumberFormat('pt-br', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(this.props.price)}</span>
            <span className="payment" dangerouslySetInnerHTML={{__html: this.props.payment}} ></span>
        </div>;
    }
}