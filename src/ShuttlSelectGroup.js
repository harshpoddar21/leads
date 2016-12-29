import React, { Component } from 'react';

class ShuttlSelectGroup extends Component{


    constructor(props){

        super(props);
    }


    render(){

        return <div>
            {this.props.children}
        </div>
    }
}

export default ShuttlSelectGroup;
