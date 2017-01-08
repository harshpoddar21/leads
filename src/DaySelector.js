import React, { Component } from 'react';

import ShuttlSelectGroup from './ShuttlSelectGroup';
import ShuttlSelectBox from './ShuttlSelectBox';

class DaySelector extends Component {
    

    constructor(props){
        
        super(props);
    }
    
    render(){

        var tha=this;
        return (<ShuttlSelectGroup onChange={this.props.onDaySelected}>
            {
                this.props.sessions.map(function (option, index) {
                    return <ShuttlSelectBox key={index+1} onChange={tha.props.onDaySelected} width="160px"
                                            value={index+1} className="answer"
                                            valueSelected={tha.props.optionSelected==0?null:tha.props.optionSelected}
                                            label={option.label}
                    />;
                })
            }
        </ShuttlSelectGroup>);

    }
}
export default DaySelector;