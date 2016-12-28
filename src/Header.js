import React, { Component } from 'react';

class Header extends Component {

    constructor(props){

        super(props);

    }

    render() {

        return (

            <div style={{marginBottom:this.props.marginBottom}}>
                <img src={this.props.logo} width={this.props.width} height={this.props.height} style={{marginLeft : this.props.marginLeft,marginTop:this.props.marginTop}} />
            </div>
        );


    }
}

export default Header;