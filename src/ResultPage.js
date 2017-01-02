import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import PhoneNumberAcceptor from './PhoneNumberAcceptor';
class ResultPage extends Component{


    constructor(props){

        super(props);
    }

    
    render(){


        var followUpActions=null;
        if (this.props.isInterested==1 ){
            
            followUpActions=<PhoneNumberAcceptor
                onPhoneNumberChanged={this.props.onPhoneNumberChanged}
                phoneNumber={this.props.phoneNumber} 
                description="Great please give us your contact details to start Shuttling!!"
                onPhoneNumberSubmitted={this.props.onPhoneNumberSubmitted}
            /> ;
                
        }else if (this.props.isInterested==2){

           followUpActions= <PhoneNumberAcceptor 
               onPhoneNumberChanged={this.props.onPhoneNumberChanged} 
               phoneNumber={this.props.phoneNumber} 
               description="Oh!! Kindly provide us your contact details and we will get in touch with you shortly." 
               onPhoneNumberSubmitted={this.props.onPhoneNumberSubmitted}
           />
        }else{
            
            followUpActions=(<div>
                <div  style={{width:"300px",marginBottom:"10px"}}>
                <FlatButton label="Book a free trial" primary={true} onTouchTap={this.props.onInterested} />
                    </div>
                <div  style={{width:"300px",marginBottom:"10px"}}>
                    <FlatButton label="Amm.. I have some queries" onTouchTap={this.props.onNotInterested} /></div>
            </div>)
        }
        console.log(followUpActions);
        return (<div >
            <div className="emphasizedText" >{this.props.offering}</div>
            {followUpActions}
            
        </div>);

    }
}

export default ResultPage;