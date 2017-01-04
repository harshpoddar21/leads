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
            <p>Please take a seat while you travel for work</p>



            <ul><li>Short every 10 mins</li><li>Assured seat</li><li>At Rs 50 only</li></ul>
            <p>Experience it yourself</p>
            <RaisedButton style={{marginTop:"20px"}} label="Get A Free Trial Now" primary={true}  onTouchTap={this.startLeadGathering}/>

        </div>;
    }
    startLeadGathering(){

        this.props.router.push("/"+window.location.search);
    }

}

export default WelcomeNewRes;