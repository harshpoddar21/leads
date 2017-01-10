import React, { Component } from 'react';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header';
class AppWrapperNewUser extends Component {

    constructor(props){

        super(props);
    }

    render(){

        return    (<MuiThemeProvider>
            <div style={{marginLeft:"20px",marginTop:"35px"}}>
                <Header  logo="/images/metro.png" width="150px"
                         marginBottom="40px"/>
                {this.props.children}</div></MuiThemeProvider>);
    }
}

export default AppWrapperNewUser;
