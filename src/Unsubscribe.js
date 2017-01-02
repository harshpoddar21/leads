import React, { Component } from 'react';
import ConnectionManager from './ConnectionManager';
import Utility from './Utility';

import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';

class Unsubscribe extends Component {

    constructor(props){

        super(props);
        this.onUnsubscribed=this.onUnsubscribed.bind(this);
        var data=Utility.getQueryParams(window.location.search);
        this.state={"responseSubmitted":false,"loading":false,"data":data["data"]};
    }

    render(){
        var content=null;
        if (!this.state.responseSubmitted) {
             content =
                <div>
                    <div>Do you really wish to unsubscribe?</div>
                    {this.state.loading &&
                    <CircularProgress size={60} thickness={7}
                                      style={{position:"fixed",top:"50%",left:"50%",marginLeft:"-30px"}}/>}
                    <FlatButton label="Unsubscribe" onTouchTap={this.onUnsubscribed} primary={true}
                    /></div>;
        }else{

            content=<div>You have been unsubscribed.</div>;
        }

        return (<div>
            {content}
        </div>);
    }
    
    onUnsubscribed(){
        
        
        this.setState({loading:true});
        var tha=this;
        ConnectionManager.unsubscribeUser(this.state,function(response){
            
            if (response.success){
                
                tha.setState({responseSubmitted:true});
                
            }else{
                
                alert("Something bad has occurred. Please try after some time.");
            }
            
        });
        
        
    }
}

export default Unsubscribe;
