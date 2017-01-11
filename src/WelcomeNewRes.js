import React, { Component} from 'react';
import ReactGA from 'react-ga';
import RaisedButton from 'material-ui/RaisedButton';

class WelcomeNewRes extends Component {


    constructor(props) {


        super(props);
        this.startLeadGathering=this.startLeadGathering.bind(this);
        ReactGA.ga("set","page","welcome new resurrected");
        ReactGA.ga("send","pageview");
    }

    render(){

        return <div>
            <p>Shuttl is running <b>AC Premium buses</b> every 10 minutes to your office
            <br/><br/>
            Now you can travel with an assured seat at just Rs 50
                <br/><br/>
                We are offering a FREE TRIAL for limited period. <b>Book now in 3 simple steps -></b>
            </p>

            <RaisedButton style={{marginTop:"20px"}} label="Book A Free Trial" primary={true}  onTouchTap={this.startLeadGathering}/>

        </div>;
    }
    startLeadGathering(){

        this.props.router.push("/"+window.location.search);
    }

}

export default WelcomeNewRes;