import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import PhoneNumberAcceptor from './PhoneNumberAcceptor';
class ResultPage extends Component{


    constructor(props){

        super(props);
    }

    
    render(){


        var followUpActions=null;
        if (this.props.isInterested==1 && !this.props.phoneNumber){
            
            followUpActions=<PhoneNumberAcceptor description="Great please give us your contact details to start Shuttling!!" /> ;
                
        }else if (this.props.isInterested==2 && !this.props.phoneNumber){

           followUpActions= <PhoneNumberAcceptor description="Oh!! Kindly provide us your contact details and we will get in touch with you shortly." />
        }else{
            
            followUpActions=(<div>
                <div  style={{width:"300px",marginBottom:"10px"}}>
                <FlatButton label="Great I am interested" primary={true} onTouchTap={this.props.onInterested} />
                    </div>
                <div  style={{width:"300px",marginBottom:"10px"}}>
                    <FlatButton label="Amm.. I have some queries" onTouchTap={this.props.onNotInterested} /></div>
            </div>)
        }
        console.log(followUpActions);
        return (<div className="row" >
            <div className="emphasizedText" >{this.props.offering}</div>
            {followUpActions}
            
        </div>);

    }
}

export default ResultPage;