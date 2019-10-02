import React from 'react';
import { decodeHTML, getRandomInt } from './Functions'
import './App.css';

const API_URL = 'https://opentdb.com';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      isLoaded: false,
      correct: [],
      incorrect: [],
    };
  }

  getQuestions(amount=4, category=-1, difficulty='Mixed') {
    this.setState({
      isLoaded: false,
    });
    difficulty = difficulty.toLowerCase();
    const url = `${API_URL}/api.php?amount=${amount}` + 
      ((category !== -1) ? `&category=${category}` : '') +
      ((difficulty !== 'mixed') ? `&difficulty=${difficulty}` : '');
    fetch(url)
    .then(res => res.json())
    .then(json => {
      this.setState({
        questions: json.results,
        isLoaded: true,
      });
    });
  }

  componentDidMount() {
    this.getQuestions();
  }

  renderQuestion(props, i){
    if (props.type === "multiple") {
      // get all wrong answers, add correct one randomly
      // const allAnswers = props.incorrect_answers;
      // const randomNumber = getRandomInt(0,3);
      // allAnswers.splice(randomNumber, 0, props.correct_answer)
      return (
        <div className="question multiple" key={i}>
          <div className="question-title">{decodeHTML(props.question)}</div>
          <div className="answers-container">
            <div onClick={()=>this.checkAnswer(props, props.incorrect_answers[0])}>{decodeHTML(props.incorrect_answers[0])}</div>
            <div onClick={()=>this.checkAnswer(props, props.incorrect_answers[1])}>{decodeHTML(props.incorrect_answers[1])}</div>
            <div onClick={()=>this.checkAnswer(props, props.incorrect_answers[2])}>{decodeHTML(props.incorrect_answers[2])}</div>
            <div onClick={()=>this.checkAnswer(props, props.correct_answer)}>{decodeHTML(props.correct_answer)}</div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="question boolean" key={i}>
        <div className="question-title">{decodeHTML(props.question)}</div>
          <div className="answers-container">
            <div onClick={()=>this.checkAnswer(props,"True")}>True</div>
            <div onClick={()=>this.checkAnswer(props,"False")}>False</div>
          </div>
        </div>
      )
    }
  }

  checkAnswer(props, answer) {
    if (answer === props.correct_answer) {
      this.setState({
        correct: this.state.correct.concat(answer),
      });
    } else {
      this.setState({
        incorrect: this.state.incorrect.concat(answer)
      });
    }
  }

  render() {

    var { isLoaded, questions } = this.state;

    if (!isLoaded) {
      return (
        <div className="App">
          <div className="header">
            <h1>Trivia Game!</h1>
            <div className="navigation">
              <button onClick={()=>this.getQuestions()}>Update Questions</button>
              <div>Correct: {this.state.correct.length}</div>
              <div>Incorrect: {this.state.incorrect.length}</div>
            </div>
          </div>
          <div className="questions-container">Loading Questions...</div>
        </div>
      )
    } else {
      return (
        <div className="App">
          <div className="header">
            <h1>Trivia Game!</h1>
            <div className="navigation">
              <button onClick={()=>this.getQuestions()}>Update Questions</button>
              <div>Correct: {this.state.correct.length}</div>
              <div>Incorrect: {this.state.incorrect.length}</div>
            </div>
          </div>
          <div className="questions-container">
            {questions.map((question, i) =>
              this.renderQuestion(question, i)
            )}
          </div>
        </div>
      )
    }
  }
}

export default App;


// {questions.map((question, i) =>
//   <Question data={question} key={i}/>
// )}
