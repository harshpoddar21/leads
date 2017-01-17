import React, { Component } from 'react';
import ShuttlSelectGroup from './ShuttlSelectGroup';
import ShuttlSelectBox from './ShuttlSelectBox';
import Utility from './Utility';

import ReactGA from 'react-ga';
import RaisedButton from 'material-ui/RaisedButton';
import ConnectionManager from './ConnectionManager';

import CircularProgress from 'material-ui/CircularProgress';

import DaySelector from './DaySelector';

class CustomerCare extends Component {

    constructor(props){

        super(props);

        this.startChatting=this.startChatting.bind(this);
        window.$zopim||(function(d,s){
            var z=window.$zopim=function(c){z._.push(c)},$=z.s=
            d.createElement(s),e=d.getElementsByTagName(s)[0];z.set=function(o){z.set.
        _.push(o)};z._=[];z.set._=[];$.async=!0;$.setAttribute("charset","utf-8");
            $.src="https://v2.zopim.com/?4WQXi3IeOKTXnUq0rAkEd5VuKYOGatxX";z.t=+new Date;$.
                type="text/javascript";e.parentNode.insertBefore($,e)})(document,"script");
    }


    render(){


        return (<div>
           <div> Hello Shuttlr!! This is ajay your personal assistance today.</div>
            <RaisedButton style={{marginTop:"20px"}} label="Start Chatting" primary={true}  onTouchTap={this.startChatting}/>
        </div>);
    }



    startChatting(){



        window.$zopim(function() {
            window.$zopim.livechat.setName("Customer");
            window.$zopim.livechat.setPhone(window.location.search.split("&")[0].split("=")[1]);
            window.$zopim.livechat.window.show();
        });

    }



}


export default CustomerCare;
