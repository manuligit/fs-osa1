import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Display = ({name, counter}) => <p>{name}: {counter} </p>

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
            positive: this.state.positive + 1
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
        return (
            <div>
                <h1>Anna palautetta</h1>
                <Button handleClick={this.addToPositive} text="Hyvä"/>
                <Button handleClick={this.addToNeutral} text="Neutraali"/>
                <Button handleClick={this.addToNegative} text="Huono"/>
                <Display name={"Hyvä"} counter={this.state.positive}/>
                <Display name={"Neutraali"} counter={this.state.neutral}/>
                <Display name={"Huono"} counter={this.state.negative}/>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
