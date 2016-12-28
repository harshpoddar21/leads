import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class PhoneNumberAcceptor extends Component{


    constructor(props){

        super(props);
    }


    render(){

        return (<div>
            <div className="col-xs-12">{this.props.description}</div>
            <div className="col-xs-12">  <TextField
                hintText="Enter your Phone Number"
            /></div>
            <div className="col-xs-12"><FlatButton label="SUBMIT" primary={true} /></div>
            </div>);
        
    }
}

export default PhoneNumberAcceptor;