import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import ReactGA from 'react-ga';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

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
            
            ["MG Road","Sohna Road","Huda City Center","Cyber City","Gold Course Road","IFFCO Chowk","Udhyog Vihar","Hero Honda","Medanta-Sector 32"],
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

        question:"My Office is located near ",
        options:[

            ["Huda City Center","Iffco Chowk"],
            ["Hauz Khas","Saket","AIIMS","Kalkaji","Greater Kailash"],
            ["Noida City Center"],
            ["NIT 1-5","Sainik Colony","Ballabhgarh","Ajronda","Neharpar","Sector 31-37","Sector 21C,45","Greenfield"]
        ],
        depends:4
    }


];

ReactGA.initialize("UA-77497361-3");
ReactDOM.render(
  <App questionAnswers={questionAnswer} />,
  document.getElementById('root')
);
