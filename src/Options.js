import React, { Component } from 'react';

import RadioButton from 'material-ui/RadioButton/RadioButton';
import RadioButtonGroup from 'material-ui/RadioButton/RadioButtonGroup';
import ShuttlSelectGroup from './ShuttlSelectGroup';
import ShuttlSelectBox from './ShuttlSelectBox';


class Options extends Component {

    constructor(props){

        super(props);
    }
    render(){

        var tha=this;
        return (

            <ShuttlSelectGroup onChange={this.props.answerSelected} valueSelected={this.props.optionSelected==0?null:this.props.optionSelected}>
                {
                    this.props.dataF.map(function(option,index){
                    return <ShuttlSelectBox key={index+1} onChange={tha.props.answerSelected} width="160px"
                        value={index+1} className="answer" valueSelected={tha.props.optionSelected==0?null:tha.props.optionSelected}
                        label={option}
                    />;
                })
                }
            </ShuttlSelectGroup>
        );
    }
}

export default Options;
