import React, { Component} from 'react';
import ReactGA from 'react-ga';
import RaisedButton from 'material-ui/RaisedButton';

class Welcome extends Component {


    constructor(props) {


        super(props);
        this.startLeadGathering=this.startLeadGathering.bind(this);
    }

    render(){

        return <div>
            <p>Remember the last time you took a Shuttl ride to office ?</p>
            <p style={{marginLeft:"74px"}}>A lot has changed since then</p>

            <p>Now travel from Faridabad to Gurgaon at just Rs 50 :</p>
            <ul><li>Short Routes</li><li>Bus every 10 minutes</li><li>Dedicated On-Ground Executives</li></ul>
            <p>Experience it yourself</p>
            <RaisedButton label="Get A Free Trial Now" primary={true}  onTouchTap={this.startLeadGathering}/>

        </div>;
    }
    startLeadGathering(){

        this.props.router.push("/"+window.location.search);
    }

}

export default Welcome;