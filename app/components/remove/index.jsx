import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './css/index.styl';

class remove extends Component {

    remove(event) {
        let url = '/web_api/carts/' + this.props.session + '/' + this.props.id;

        if(this.props.variant)
            url = '/web_api/carts/' + this.props.session + '/' + this.props.id + '/' + this.props.variant;

        axios.delete(url)
            .then(response =>  {
                const UPDATECART = new CustomEvent('UPDATECART', { detail: response.data });
                window.dispatchEvent(UPDATECART);
            });

    }

    render() {

        return  <button className="minicart__delete" type="button" onClick={(e) => this.remove(e)}>
                X
            </button>;
    }

}

remove.propTypes = {
};

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(remove);
