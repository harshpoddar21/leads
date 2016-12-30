import React, { Component } from 'react';

import './App.css';

import QuestionAnswer from './QuestionAnswer';
import BottomNavigation from './BottomNavigation';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header';
import FlatButton from 'material-ui/FlatButton';
import Utility from './Utility';
import ResultPage from './ResultPage';

import ConnectionManager from './ConnectionManager';

import ReactGA from 'react-ga';
import CircularProgress from 'material-ui/CircularProgress';

class App extends Component {


    constructor(props) {


        super(props);
        this.state = {
            answers: 0,
            currentQuestionShown: 1,
            isInterested: 3,
            phoneNumber: null,
            loading: false,
            responseSubmitted: false
        };

        this.backButtonClicked = this.backButtonClicked.bind(this);
        this.answerSelected = this.answerSelected.bind(this);
        this.onInterested = this.onInterested.bind(this);
        this.onNotInterested = this.onNotInterested.bind(this);
        this.onPhoneNumberChanged = this.onPhoneNumberChanged.bind(this);
        this.onPhoneNumberSubmitted = this.onPhoneNumberSubmitted.bind(this);

    }

    answerSelected(e, value) {

        var tha = this;
        setTimeout(function () {

            console.log("Answer changed");
            var questionNo = tha.getCurrentQuestionNo();
            console.log("Answer changed for question " + questionNo);
            tha.updateAnswerForQuestionNo(value, questionNo);


        }, 200);
    }


    render() {


        var questionAnswer = this.props.questionAnswers[this.getCurrentQuestionNo() - 1];
        const content = !this.state.responseSubmitted ? (this.getCurrentQuestionNo() != -1) ?
            <QuestionAnswer optionSelected={this.getAnswerToQuestionNo(this.getCurrentQuestionNo())}
                            answerSelected={this.answerSelected}
                            question={questionAnswer.question}
                            options={questionAnswer.depends!=undefined?
                            questionAnswer.options[this.getAnswerToQuestionNo(questionAnswer.depends)-1]:
                            questionAnswer.options
                            }
            />
            : <ResultPage onPhoneNumberChanged={this.onPhoneNumberChanged} onInterested={this.onInterested}
                          onPhoneNumberSubmitted={this.onPhoneNumberSubmitted}
                          onNotInterested={this.onNotInterested} offering={this.getOfferingText()}
                          isInterested={this.state.isInterested} phoneNumber={this.state.phoneNumber}/>
            :
            <div>{this.state.isInterested ? "We are very excited to have you on-board. We look forward to serving you soon" : "A Shuttl executive will call you in next 24 hours to resolve all your queries."}</div>;
        const bottomPanel = (this.getCurrentQuestionNo() != -1 && !this.state.responseSubmitted) ? (
            <BottomNavigation rightButton={(
                   <FlatButton label="Back" onTouchTap={this.backButtonClicked} />
                   )}/> ) : null;

        return (
            <MuiThemeProvider>

                <div style={{marginLeft:"20px",marginTop:"35px"}}>
                    <Header logo="http://mycommute.shuttl.com/images/shuttl-logo.png" width="75px" height="24px"
                            marginBottom="40px"/>
                    {this.state.loading &&
                    <CircularProgress size={60} thickness={7} style={{position:"fixed",top:"50%",left:"50%",marginLeft:"-30px"}}/>}
                    {content}

                    {bottomPanel}

                </div>
            </MuiThemeProvider>
        );
    }

    backButtonClicked() {


        if (this.state.currentQuestionShown > 1) {


            this.setState({currentQuestionShown: this.state.currentQuestionShown - 1});
            this.sendPageViewForCurrentPage();
        }


    }

    getCurrentQuestionNo() {


        return this.state.currentQuestionShown;

    }

    updateQuestionNoShownForAnswer() {

        if (this.state.currentQuestionShown < this.props.questionAnswers.length) {


            this.setState({currentQuestionShown: this.state.currentQuestionShown + 1});


        } else {


            this.setState({currentQuestionShown: -1});

        }
        this.sendPageViewForCurrentPage();

    }

    updateAnswerForQuestionNo(answer, questionNo) {

        var decAnswer = ((Math.pow(16, questionNo - 1)) * answer) + Utility.hexToDecimal(this.state.answers) - (this.getAnswerToQuestionNo(questionNo) * (Math.pow(16, (questionNo - 1))));

        this.setState({answers: Utility.decimalToHex(decAnswer)});
        ReactGA.ga("send","event",this.props.questionAnswers[questionNo-1].question,"Answered",this.getHumanReadableAnswerToQuestionNo(questionNo));
        window.fbq('track', 'AddToCart', {
            content_type: 'question',
            content_name:this.props.questionAnswers[questionNo-1].question,
            content_ids:[this.getHumanReadableAnswerToQuestionNo(questionNo)]
        });
        this.updateQuestionNoShownForAnswer();
    }

    getAnswerToQuestionNo(questionsNo) {

        console.log("answer for question no " + questionsNo + " with answers " + this.state.answers);
        return ((Utility.hexToDecimal(this.state.answers) % (Math.pow(16, questionsNo)) - Utility.hexToDecimal(this.state.answers) % (Math.pow(16, (questionsNo - 1))))) / Math.pow(16, questionsNo - 1);
    }

    getOfferingText() {


        var toCity = this.getAnswerToQuestionNo(2);
        var fromCity = this.getAnswerToQuestionNo(4);
        var toStr = this.props.questionAnswers[2].options[toCity - 1][this.getAnswerToQuestionNo(3) - 1];
        var fromStr = this.props.questionAnswers[4].options[fromCity - 1][this.getAnswerToQuestionNo(5) - 1];
        return "Premium AC Bus available from " + fromStr + " to " + toStr + " @ Rs 50. Book for a Free Trial.";
    }

    onInterested() {

        window.fbq('track', 'AddToCart', {
            content_type: 'click',
            content_name:"interested"
        });
        ReactGA.ga("send","event","is interested?","answered","interested");
        this.setState({isInterested: 1},function(){


            this.sendPageViewForCurrentPage();
        });

    }

    onNotInterested() {

        window.fbq('track', 'AddToCart', {
            content_type: 'click',
            content_name:"not interested"
        });

        ReactGA.ga("send","event","is interested?","answered","not interested");
        this.setState({isInterested: 2},function(){


            this.sendPageViewForCurrentPage();

        });

    }

    onPhoneNumberChanged(e, phoneNumber) {


        console.log("phonenumber " + phoneNumber);
        this.setState({phoneNumber: phoneNumber});

    }

    onPhoneNumberSubmitted() {

        if (/\d{10,10}/.test(this.state.phoneNumber)) {


            window.fbq('track', 'AddToCart', {
                content_type: 'click',
                content_name:"phone number submit"
            });

            ReactGA.ga("send","event","Phone Number","submitted");
            this.setState({loading: true});
            var tha = this;
            ConnectionManager.submitLeadAsync(this.state, function (response) {

                if (response.success) {

                    tha.setState({responseSubmitted: true, loading: false});
                    tha.sendPageViewForCurrentPage();
                    window.fbq('track', 'Lead', {
                        content_type: 'lead_type',
                        content_name:tha.state.isInterested==1?"Interested":"Not Interested"
                    });

                    ReactGA.ga("send","event","Lead",tha.state.isInterested==1?"Interested":"Not Interested");
                } else {

                    alert("Some Error Occurred");
                }
            });
        }

    }



     sendPageViewForCurrentPage() {

         if (this.getCurrentQuestionNo()!=-1){

             ReactGA.ga("set","page",this.getHumanReadableCurrentQuestion());
             ReactGA.ga("send","pageview");
             window.fbq('track', 'ViewContent', {
                 content_type: 'page view',
                 content_name:this.getHumanReadableCurrentQuestion()
             });
         }else {

             if (!this.state.responseSubmitted) {
                 if (this.state.isInterested == 3) {


                     ReactGA.ga("set", "page", "interest inquiry");
                     ReactGA.ga("send", "pageview");
                     window.fbq('track', 'ViewContent', {
                         content_type: 'page view',
                         content_name:"interest inquiry"
                     });
                 } else if (this.state.isInterested == 1) {

                     ReactGA.ga("set", "page", "interested");
                     ReactGA.ga("send", "pageview");
                     window.fbq('track', 'ViewContent', {
                         content_type: 'page view',
                         content_name:"interested"
                     });
                 } else {


                     ReactGA.ga("set", "page", "not interested");
                     ReactGA.ga("send", "pageview");
                     window.fbq('track', 'ViewContent', {
                         content_type: 'page view',
                         content_name:"not interested"
                     });
                 }
             }else{

                 ReactGA.ga("set", "page", "response submitted");
                 ReactGA.ga("send", "pageview");
                 window.fbq('track', 'ViewContent', {
                     content_type: 'page view',
                     content_name:"response submitted"
                 });
             }

         }

     }


    getHumanReadableAnswerToQuestionNo(questionNo){

        var answer=this.getAnswerToQuestionNo(questionNo);
        if (this.props.questionAnswers[questionNo-1].depends!=undefined){

            var dependentAnswer=this.getAnswerToQuestionNo(this.props.questionAnswers[questionNo-1].depends);
            return this.props.questionAnswers[questionNo-1].options[dependentAnswer-1][answer];
        }else{
            
            return this.props.questionAnswers[questionNo-1].options[answer-1];
        }

    }
    
    
    getHumanReadableCurrentQuestion(){

        return this.props.questionAnswers[this.getCurrentQuestionNo()-1].question;
    }


}



export default App;
