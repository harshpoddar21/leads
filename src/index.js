import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import ReactGA from 'react-ga';
import { Router, Route, Link,browserHistory,IndexRoute} from 'react-router';
import BookShuttl from './BookShuttl';
import Unsubscribe from './Unsubscribe';
import AppWrapper from './AppWrapper';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Welcome from './Welcome';
import WelcomeNewRes from './WelcomeNewRes';
injectTapEventPlugin();


/*
* Please see
* if you are changing order of question no please make relevant change in App.js wherein were are finding 
* answer to question no based on this info and also last page where this info is displayed
* */
const questionAnswer=[

    {
        question:"I commute office by ",
        options:[

            "Car",
            "Car Pool",
            "Metro",
            "Shared Cabs",
            "Bus"
        ]

    },
    {

        question:"My Office is in ",
        options:[

            "Gurgaon",
            "Delhi",
            "Noida"
        ]
    },
    {
        
        question:"My Office is located at/near ",
        options:[
            
            ["MG Road","Sohna Road","Huda City Center","Cyber City","Golf Course Road","IFFCO Chowk","Udhyog Vihar","Hero Honda","Medanta-Sector 32"],
            ["Okhla","Jasola","Nehru Place","Bhikaji Cama","AIIMS","Saket"],
            ["Sector 62","Sector 15","Sector 16","Noida City Center"]
        ],
        depends:2
    }
    ,

    {

        question:"I Live in",
        options:[

            "Gurgaon",
            "Delhi",
            "Noida",
            "Faridabad"

        ]
    },

    {

        question:"My home is located near ",
        options:[

            ["Huda City Center","Iffco Chowk","MG Road"],
            ["Hauz Khas","Saket","AIIMS","Kalkaji","Greater Kailash","Govind Puri","Sarita Vihar","East Kailash"],
            ["Noida City Center"],
            ["NIT 1-5","Sainik Colony","Ballabhgarh","Ajronda","Neharpar","Sector 31-37","Sector 21C,45","Greenfield"]
        ],
        depends:4
    }


];

const Appi=React.createClass({
    render(){
        return <App questionAnswers={questionAnswer} />
    }});
ReactGA.initialize("UA-77497361-3");
ReactDOM.render(

    (<Router history={browserHistory}>
        <Route path="/" component={AppWrapper} >
            <Route path="book_shuttl" component={BookShuttl} />
            <IndexRoute component={Appi}/>
            <Route path="unsubscribe" component={Unsubscribe} />

            <Route path="welcomeNewRes" component={WelcomeNewRes} />
            <Route path="welcome" component={Welcome} />
        </Route>
    </Router>),
  document.getElementById('root')
);
