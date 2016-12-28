import React, { Component } from 'react';

import RadioButton from 'material-ui/RadioButton/RadioButton';
import RadioButtonGroup from 'material-ui/RadioButton/RadioButtonGroup';

class Options extends Component {

    constructor(props){

        super(props);
    }
    render(){

        return (

            <RadioButtonGroup onChange={this.props.answerSelected} valueSelected={this.props.optionSelected==0?null:this.props.optionSelected}>
                {
                    this.props.dataF.map(function(option,index){
                    return <RadioButton key={index+1}
                        value={index+1} className="answer"
                        label={option}
                    />;
                })
                }
            </RadioButtonGroup>
        );
    }
}

export default Options;
