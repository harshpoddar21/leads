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
                <Header logo="http://mycommute.shuttl.com/images/shuttl-logo.png" width="75px" height="24px"
                        marginBottom="40px"/>
        {this.props.children}</div></MuiThemeProvider>);
    }
}

export default AppWrapper;
