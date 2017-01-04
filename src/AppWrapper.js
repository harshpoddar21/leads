import React, { Component } from 'react';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header';
class AppWrapper extends Component {

    constructor(props){

        super(props);
    }

    render(){

        return    (<MuiThemeProvider>
            <div style={{marginLeft:"20px",marginTop:"35px"}}>
                <Header  logo="/images/shuttl.png" width="100px"
                        marginBottom="40px"/>
        {this.props.children}</div></MuiThemeProvider>);
    }
}

export default AppWrapper;
