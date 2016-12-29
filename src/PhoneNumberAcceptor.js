import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class PhoneNumberAcceptor extends Component{


    constructor(props){

        super(props);
    }


    render(){

        return (<div>
            <div className="">{this.props.description}</div>
            <div className="">  <TextField
                hintText="Enter your Phone Number"
                value={this.props.phoneNumber}
                onChange={this.props.onPhoneNumberChanged}
            /></div>
            <div className=""><FlatButton label="SUBMIT" onTouchTap={this.props.onPhoneNumberSubmitted} primary={true}/></div>
            </div>);
        
    }
}

export default PhoneNumberAcceptor;