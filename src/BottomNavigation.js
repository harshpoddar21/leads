import React, { Component } from 'react';

import Paper from 'material-ui/Paper';


class BottomNavigation extends Component {




    constructor(props){

        super(props);
    }

    render(){
        const stylen={

            height:"40px",
            width:"100%",
            textAlign:"center",
            position:"absolute",
            bottom:"0px"
        }
        return <div style={stylen}>
            <div style={{float:"left"}} >{this.props.leftButton}</div>
        </div>;
    }


}

export default BottomNavigation;