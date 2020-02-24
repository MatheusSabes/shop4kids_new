import React, { Component } from 'react';

export default class Name extends Component {

    constructor(props) {
        super(props);

        this.state = {
            key: 0
        };
    }
    componentWillReceiveProps() {
        this.setState({key: 0});
    }
    render() {

        if( !this.props.images.length )
            return <div className="quickview__images">
                <span className="quickview__images--no">Sem Imagem</span>
            </div>;

        return <div className="quickview__images">
            <figure className="quickview__image">
                <img src={this.props.images[this.state.key]} />
            </figure>

            <div className="quickview__images--more">
                <ul>{this.props.images.map((image, key) => <li key={key} onClick={(e) => { this.setState({key}) }} ><img src={image} /></li>)}</ul>
            </div>

        </div>;
    }
}