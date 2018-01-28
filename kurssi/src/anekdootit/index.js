import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      pisteet: [0,0,0,0,0,0]
    }
  }

  getRandom = () => {
    var item = Math.floor(Math.random() * anecdotes.length)
    this.setState({ selected: item })
  }

  vote = () => {
    const kopio = [...this.state.pisteet]
    kopio[this.state.selected] += 1
    this.setState({ pisteet: kopio })
  }

  getMostVoted = () => {
    var index = 0
    var comparator = this.state.pisteet[0]
    console.log(this.state.pisteet.length)
    for (let i = 1; i < this.state.pisteet.length-1; i++) {
      if (this.state.pisteet[i] > comparator) {
        comparator=this.state.pisteet[i]
        index = i
      }
    }
    return [this.props.anecdotes[index], this.state.pisteet[index]]
  }

  getMostVotedF= () => {
    const reducer = (first, second) => (first > second) ? first : second
    var result = this.state.pisteet.reduce(reducer)
    // Get index of result
    var index = this.state.pisteet.findIndex((element) => (element===result))

    return [this.props.anecdotes[index], this.state.pisteet[index]]
  }


  render() {
    // Calculate most voted from the list
    var mostvotes = this.getMostVotedF()
    var voted = mostvotes[0]
    var votes = mostvotes[1]
    return (
      <div>
         <p>{this.props.anecdotes[this.state.selected]}</p>
         <p> has {this.state.pisteet[this.state.selected]} votes </p>
         <Button handleClick={this.vote} text="Vote"/>
         <Button handleClick={this.getRandom} text="New anecdote"/>

         <h2>Anecdote with most votes:</h2>
         <p>{voted}</p>
         <p> has {votes} votes </p>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)