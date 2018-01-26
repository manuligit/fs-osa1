import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Statistics = ({positive, negative, neutral, average, percent}) => {
    // Add % to the percentage
    const asPercent = x => (x)+"%"

    return (
        <div>
            <Statistic name={"Hyvä"} counter={positive}/>
            <Statistic name={"Neutraali"} counter={neutral}/>
            <Statistic name={"Huono"} counter={negative}/>
            <Statistic name={"Keskiarvo"} counter={average}/>
            <Statistic name={"Positiivisia"} counter={asPercent(percent)}/>
        </div>
    )
}

const Statistic = ({name, counter}) => <p>{name}: {counter} </p>

class App extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            positive: 0,
            negative: 0,
            neutral: 0
        }
    }

    addToPositive = () => {
        this.setState({ 
            positive: this.state.positive + 1,
        })
    }

    addToNegative= () => {
        this.setState({ 
            negative: this.state.negative + 1
        })
    }

    addToNeutral= () => {
        this.setState({ 
            neutral: this.state.neutral + 1
        })
    }

    render() {
        console.log(this.state)
        // Calculate average and percent every time the state changes
        var average = ((this.state.positive - this.state.negative ) / (this.state.positive + this.state.negative + this.state.neutral))
        var percent = (this.state.positive / (this.state.positive + this.state.negative + this.state.neutral))
        
        // Catch NaN and round the numbers
        average = (average || 0).toFixed(2)
        percent = (percent*100 || 0).toFixed(2)

        // Render statistics only if there are any
        if (this.state.positive === 0 && this.state.negative === 0 && this.state.neutral === 0) {
            return (
                <div>
                    <h1>Anna palautetta</h1>
                    <Button handleClick={this.addToPositive} text="Hyvä"/>
                    <Button handleClick={this.addToNeutral} text="Neutraali"/>
                    <Button handleClick={this.addToNegative} text="Huono"/>
                    <p>Ei yhtään palautetta annettu</p>     
                </div>
            )
        }

        return (
            <div>
                <h1>Anna palautetta</h1>
                <Button handleClick={this.addToPositive} text="Hyvä"/>
                <Button handleClick={this.addToNeutral} text="Neutraali"/>
                <Button handleClick={this.addToNegative} text="Huono"/>
                <Statistics positive={this.state.positive} negative={this.state.negative} neutral={this.state.neutral} average={average} percent={percent}/>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));