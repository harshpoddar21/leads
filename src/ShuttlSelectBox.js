import React, { Component } from 'react';

class ShuttlSelectBox extends Component {

    constructor(props){

        super(props);
        this.state={pressed:false};
        this.onClickCustom=this.onClickCustom.bind(this);
    }

    render() {

        const styleClicked={

            cursor: "pointer",
            background:"#00ADB7",
            color:"white",
            lineHeight:"30px",
            height: "30px",
            margin: "18px 0px",
            border: "1px solid #eee",
            width: this.props.width,
            paddingLeft: "19px",
            borderRadius: "6px"

        };

        const styleUnclicked={
            cursor: "pointer",
            lineHeight:"30px",
        height: "30px",
        margin: "18px 0px",
        border: "1px solid #969090",
        width: this.props.width,
        paddingLeft: "19px",
        borderRadius: "6px"
        };
        return (

            <div style={(this.props.value==this.props.valueSelected)|| this.state.pressed?styleClicked:styleUnclicked} className={this.props.className}
                 onTouchTap={this.onClickCustom}>{this.props.label}</div>
        );
    }


    onClickCustom(){

        this.setState({pressed:true});

        var tha=this;
        setTimeout(function(){

            tha.props.onChange({},tha.props.value);
            tha.setState({pressed:false});
        },100);

    }
}

export default ShuttlSelectBox;