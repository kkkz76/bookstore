import { Component } from "react"
import React from "react"

class Temperature extends Component{

constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
}


handleChange(e){
    this.props.onTemperatureChanged(e.target.value);
}
    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Temperature in {scalename[scale]}</legend>
                <input value={temperature} onChange={this.handleChange}/>
            </fieldset>
        )
    }
}
const scalename = {
    c:'celcius',
    f:'fahrenheit'
}

function toCelcius(fahrenheit) {
    return (fahrenheit-32)*5/9;
}
function toFahrenheit(celcius){
    return (celcius*9/5)+32;
}

function tryConvert(temperature, convert){
    const input = parseFloat(temperature);
    if(Number.isNaN(input)){
        return '';
    }                 // why not just use input instead of Number
    const output = convert(input);
    const rounded = Math.round(output*1000)/1000;
    return rounded.toString();
}



export default class TemperatureStats extends Component{
    constructor(props) {
    super(props);
    this.handleCelciusChange = this.handleCelciusChange.bind(this);
    this.handleFahrenheit = this.handleFahrenheit.bind(this);
    this.state = {temperature:'', scale:'c'};

}

handleCelciusChange(temperature) {
this.setState({temperature, scale:'c'});
}
handleFahrenheit(temperature) {
this.setState({temperature, scale:'f'});
}


render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celcius = scale === 'f' ? tryConvert(temperature, toCelcius):temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit):temperature;

    return(
        <div>
            <Temperature
            scale='c'
            temperature={celcius}
            onTemperatureChanged={this.handleCelciusChange}/> 

            <Temperature
            scale='f'
            temperature={fahrenheit}
            onTemperatureChanged={this.handleFahrenheit}/>
            <BoilingTemperature celcius={parseFloat(celcius)} />

        </div>
    )
    }

}

function BoilingTemperature(props) {
    if(props.celcius>=100){
        return (<p>Water Would boil</p>)
    }else{
        return (<p>Water Would not boil</p>)
    };
}