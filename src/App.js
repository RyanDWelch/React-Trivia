import React from 'react';
import Question from './Question';
import './App.css';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      isLoaded: false,
    };
  }
  componentDidMount() {
    fetch('https://opentdb.com/api.php?amount=4')
      .then(res => res.json())
      .then(json => {
        this.setState({
          questions: json.results,
          isLoaded: true
        });

      });
  }

  render() {
    var { isLoaded, questions } = this.state;

    if (!isLoaded) {
      return (
        <div className="App">
          <h1>Trivia Game!</h1>
          <div>Loading questions...</div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <h1>Trivia Game!</h1>
          {questions.map((question, i) =>
            <Question data={question} key={i}/>
          )}
        </div>
      )
    }
  }
}

export default App;
