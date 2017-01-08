import React, { Component } from 'react';
import ShuttlSelectGroup from './ShuttlSelectGroup';
import ShuttlSelectBox from './ShuttlSelectBox';
import Utility from './Utility';

import ReactGA from 'react-ga';
import RaisedButton from 'material-ui/RaisedButton';
import ConnectionManager from './ConnectionManager';

import CircularProgress from 'material-ui/CircularProgress';

import DaySelector from './DaySelector';

class BookShuttl extends Component {

    constructor(props){
        
        super(props);
        var data=Utility.getQueryParams(window.location.search);
        this.state={loading:false,optionSelected:0,data:data,responseSubmitted:false,timeSlotSelected:0};
        this.bookingSelected=this.bookingSelected.bind(this);
        this.onBookingSubmitted=this.onBookingSubmitted.bind(this);
        this.slotSelected=this.slotSelected.bind(this);
        window.fbq('track', 'ViewContent', {
            content_type: 'page view',
            content_name:"book shuttl"
        });

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

                    {this.state.optionSelected==0 && <DaySelector onDaySelected={this.bookingSelected} optionSelected={this.state.optionSelected} sessions={this.state.result.sessions}/>}

                {this.state.optionSelected!=0  &&
                    
                    this.state.result.sessions[this.state.optionSelected-1].slots.map(function (option, index) {
                    return <ShuttlSelectBox key={index+1} onChange={tha.slotSelected} width="160px"
                    value={option.unixTime} className="answer"
                    valueSelected={tha.state.timeSlotSelected==0?null:tha.state.timeSlotSelected}
                    label={option.label}
                    />
                })
                }
                {this.state.result && this.state.optionSelected!=0 &&

                <RaisedButton label="SUBMIT" style={{marginTop:"10px",width:"160px"}} onTouchTap={this.onBookingSubmitted} primary={true}
                            disabled={this.state.timeSlotSelected>0 ? false:true}/>
                }
                </div>)}
            </div>;
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
    
    slotSelected(event,value){

        console.log(value);

        this.setState({timeSlotSelected:value});

        ReactGA.ga("send","event","time slot","selected",value%86400);
        window.fbq('track', 'AddToCart', {
            content_type: 'click',
            content_name:"time slot",
            value:value%86400
        }); 
        
    }

    onBookingSubmitted(){

        this.setState({loading:true});
        var tha=this;



        ConnectionManager.submitBoarding(this.state,function(response){


            ReactGA.ga("set", "page", "booking done");
            ReactGA.ga("send", "pageview");
            window.fbq('track', 'ViewContent', {
                content_type: 'page view',
                content_name:"booking done"
            });
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

            ReactGA.ga('set', 'userId', response["data"]["phoneNumber"]);
            tha.setState({loading:false});
            tha.setState({result:response});
            
        });
        
    }

}


export default BookShuttl;
