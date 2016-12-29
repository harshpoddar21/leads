import $ from 'jquery';
import ReactGA from 'react-ga';
import Utility from './Utility';
class ConnectionManager{
    

    static submitLeadAsync(data,callback){
        var SUBMIT_LEAD="http://myor.shuttl.com/lead/submitNewLead";

        ConnectionManager.makeAsyncHttpCallPostCall(SUBMIT_LEAD,data,callback);

    }

    static makeAsyncHttpCallPostCall(url,data,callback){

        var nowTime=Utility.getCurrentTimeInUnix();
        
        ReactGA.ga("send","pageview",url);
        $.ajax({url:url,
            data:data,method:"post"}).done(function(response){

            callback(response);
            ReactGA.ga("send","timing","lead submit","response time",Utility.getCurrentTimeInUnix()-nowTime);
        });

    }
}

export default ConnectionManager;