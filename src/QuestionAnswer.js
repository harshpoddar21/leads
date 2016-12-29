import React, { Component } from 'react';
import Options from './Options';
class QuestionAnswer extends Component{


    constructor(props){

        super(props);
    }

    render(){

        return (
            <div>
         <div className="question">{this.props.question}</div>
         <Options dataF={this.props.options} answerSelected={this.props.answerSelected} optionSelected={this.props.optionSelected}/>
            </div>
    )
    }

}

export default QuestionAnswer;