import React, { Component } from 'react';

import './App.css';

import QuestionAnswer from './QuestionAnswer';
import BottomNavigation from './BottomNavigation';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header';
import FlatButton from 'material-ui/FlatButton';
import Utility from './Utility';
import ResultPage from './ResultPage';
class App extends Component {

    
    constructor(props){

        super(props);
        this.state={answers:0,currentQuestionShown:1,isInterested:3,phoneNumber:null};

        this.backButtonClicked=this.backButtonClicked.bind(this);
        this.answerSelected=this.answerSelected.bind(this);
        this.onInterested=this.onInterested.bind(this);
        this.onNotInterested=this.onNotInterested.bind(this);

    }
    
    answerSelected(e,value){

        var tha=this;
        setTimeout(function(){

            console.log("Answer changed");
            var questionNo=tha.getCurrentQuestionNo();
            console.log("Answer changed for question "+questionNo);
            tha.updateAnswerForQuestionNo(value,questionNo);


        },200);
    }


    render() {
        const content=(this.getCurrentQuestionNo()!=-1)?<QuestionAnswer optionSelected={this.getAnswerToQuestionNo(this.getCurrentQuestionNo())} answerSelected={this.answerSelected} questionAnswer={this.props.questionAnswers[this.getCurrentQuestionNo()-1]} /> : <ResultPage onInterested={this.onInterested} onNotInterested={this.onNotInterested} offering={this.getOfferingText()} isInterested={this.state.isInterested} phoneNumber={this.state.phoneNumber} />

        const bottomPanel=(this.getCurrentQuestionNo()!=-1)?(<BottomNavigation leftButton={(
                   <FlatButton label="Back" onTouchTap={this.backButtonClicked} />
                   )} /> ):null;

                                            return (
        <MuiThemeProvider>

            <div style={{marginLeft:"20px",marginTop:"35px"}}>
            <Header logo="http://mycommute.shuttl.com/images/shuttl-logo.png" width="90px" height="47px" marginBottom="40px"  />
            {content}

                {bottomPanel}

            </div>
        </MuiThemeProvider>
    );
  }

    backButtonClicked(){

        if (this.state.currentQuestionShown>1){

            this.setState({currentQuestionShown:this.state.currentQuestionShown-1});
        }

    }

    getCurrentQuestionNo(){



        return this.state.currentQuestionShown;

    }

    updateQuestionNoShownForAnswer(){

        if (this.state.currentQuestionShown<this.props.questionAnswers.length){


            this.setState({currentQuestionShown:this.state.currentQuestionShown+1});

        }else{


            this.setState({currentQuestionShown:-1});
        }


    }

    updateAnswerForQuestionNo(answer,questionNo){
        
        var decAnswer=((Math.pow(16,questionNo-1))*answer)+Utility.hexToDecimal(this.state.answers)-(this.getAnswerToQuestionNo(questionNo)*(Math.pow(16,(questionNo-1))));

        console.log(answer+","+questionNo);
        console.log("Dec Answer"+decAnswer);
        console.log(Utility.decimalToHex(decAnswer));
        this.setState({answers:Utility.decimalToHex(decAnswer)});
        this.updateQuestionNoShownForAnswer();
    }

    getAnswerToQuestionNo(questionsNo){

        console.log("answer for question no "+questionsNo+" with answers "+this.state.answers);
        return ((Utility.hexToDecimal(this.state.answers)%(Math.pow(16,questionsNo))-Utility.hexToDecimal(this.state.answers)%(Math.pow(16,(questionsNo-1)))))/Math.pow(16,questionsNo-1);
    }

    getOfferingText(){

        
        var from=this.getAnswerToQuestionNo(2);
        var to=this.getAnswerToQuestionNo(3);
        
        return "Premium AC Bus available from "+this.props.questionAnswers[1].options[from-1]+" to "+this.props.questionAnswers[2].options[to-1]+" @ Rs 50. Book for a Free Trial.";
    }
    
    onInterested(){
    
        this.setState({isInterested:1});
        
    }
    
    onNotInterested(){


        this.setState({isInterested:2});
    }

}

export default App;
