import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
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

        question:"I Live in",
        options:[

            "Gurgaon",
            "Delhi",
            "Noida"
        ]
    }
    


];

ReactDOM.render(
  <App questionAnswers={questionAnswer} />,
  document.getElementById('root')
);
