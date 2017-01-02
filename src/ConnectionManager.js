import $ from 'jquery';
import ReactGA from 'react-ga';
import Utility from './Utility';
class ConnectionManager{


    static submitLeadAsync(data,callback){

        var BASE=!data || data["utm_campaign"]!="local_testing" ?"http://myor.shuttl.com":"http://localhost:3000";
        var SUBMIT_LEAD=BASE+"/lead/submitNewLead";

        ConnectionManager.makeAsyncHttpCallPostCall(SUBMIT_LEAD,data,callback);

    }

    static getBoardingDetails(data,callback){


        var BASE=(!data || data["utm_campaign"]!="local_testing")  ?"http://myor.shuttl.com":"http://localhost:3000";
        var GET_BOARDING_DETAILS=BASE+"/boarding/getBoardingDetails";
        
        ConnectionManager.makeAsyncHttpCallGetCall(GET_BOARDING_DETAILS,data,callback);

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

    static makeAsyncHttpCallGetCall(url,data,callback){

        var nowTime=Utility.getCurrentTimeInUnix();

        ReactGA.ga("send","pageview",url);
        $.ajax({url:url,
            data:data,method:"get"}).done(function(response){

            callback(response);
            ReactGA.ga("send","timing","lead submit","response time",Utility.getCurrentTimeInUnix()-nowTime);
        });

    }
    
    static submitBoarding(data,callback){
        var BASE=(!data || data["utm_campaign"]!="local_testing")  ?"http://myor.shuttl.com":"http://localhost:3000";
        var SUBMIT_BOARDING=BASE+"/boarding/submitBoarding";

        ConnectionManager.makeAsyncHttpCallPostCall(SUBMIT_BOARDING,data,callback);
        
    }
    
    static unsubscribeUser(data,callback){
        var BASE=(!data || data["utm_campaign"]!="local_testing")  ?"http://myor.shuttl.com":"http://localhost:3000";
        var UNSUBSCRIBE=BASE+"/boarding/unsubscribe";

        ConnectionManager.makeAsyncHttpCallGetCall(UNSUBSCRIBE,data,callback);
        
    }
}

export default ConnectionManager;