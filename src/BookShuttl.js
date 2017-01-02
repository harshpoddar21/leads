import React, { Component } from 'react';
import ShuttlSelectGroup from './ShuttlSelectGroup';
import ShuttlSelectBox from './ShuttlSelectBox';
import Utility from './Utility';

import FlatButton from 'material-ui/FlatButton';
import ConnectionManager from './ConnectionManager';

import CircularProgress from 'material-ui/CircularProgress';

class BookShuttl extends Component {

    constructor(props){
        
        super(props);
        var data=Utility.getQueryParams(window.location.search);
        this.state={loading:false,optionSelected:0,data:data,responseSubmitted:false};
        this.bookingSelected=this.bookingSelected.bind(this);
        this.onBookingSubmitted=this.onBookingSubmitted.bind(this);
    }


    render(){

        var tha=this;
        var content=null;
        if (this.state.data && !this.state.responseSubmitted) {
            content = <div>
                { this.state.loading &&
                <CircularProgress size={60} thickness={7}
                                  style={{position:"fixed",top:"50%",left:"50%",marginLeft:"-30px"}}/>}
                { this.state.result && (
                <div>Book Your Shuttl from {this.state.result.data.from} to {this.state.result.data.to}
                    <ShuttlSelectGroup onChange={this.bookingSelected}>
                        {
                            this.state.result.bookingButtons.map(function (option, index) {
                                return <ShuttlSelectBox key={index+1} onChange={tha.bookingSelected} width="160px"
                                                        value={option.unixTime} className="answer"
                                                        valueSelected={tha.state.optionSelected==0?null:tha.state.optionSelected}
                                                        label={option.label}
                                />;
                            })
                        }
                        <FlatButton label="SUBMIT" onTouchTap={this.onBookingSubmitted} primary={true}
                                    disabled={this.state.optionSelected?false:true}/>
                    </ShuttlSelectGroup>
                </div>)}</div>;
        }else if (!this.state.responseSubmitted){

            content=<div>Something bad has occurrend</div>;
        }else{
            
            content=<div>Awesome your booking is placed. You will shortly receive a sms confirmation</div>
        }
        console.log(content);
        return (<div>
        {content}</div>
        );
    }




    bookingSelected(event,value){

        this.setState({optionSelected:value});
    }

    onBookingSubmitted(){

        this.setState({loading:true});
        var tha=this;
        ConnectionManager.submitBoarding(this.state,function(response){

            tha.setState({loading:false});
            if (response.success){
                
                tha.setState({responseSubmitted:true});
            }else{
                
                window.alert("Something bad has happened");
            }
        });
        

    }
    
    componentDidMount(){
        
        this.setState({loading:true});
        var tha=this;
        ConnectionManager.getBoardingDetails(this.state.data,function(response){
            
            tha.setState({loading:false});
            tha.setState({result:response});
            
        });
        
    }

}


export default BookShuttl;
