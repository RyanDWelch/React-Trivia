import React from 'react';
import { decodeHTML, getRandomInt } from './Functions'


export default class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: decodeHTML(this.props.data.question),
      type: this.props.data.type,
      answer: this.props.data.correct_answer,
      incorrect_answers: [],
      status: null,
      answered: null
    }
  }
  
  componentDidMount(){
    // get all wrong answers, add correct one randomly
    const allAnswers = this.props.data.incorrect_answers;
    const randomNumber = getRandomInt(0,3);
    allAnswers.splice(randomNumber, 0, this.props.data.correct_answer)

    this.setState({
      incorrect_answers: allAnswers
    })
  }

  checkAnswer(answer) {
    if (answer === this.props.data.correct_answer) {
      this.setState({
        status: "correct",
        answered: "beenanswered"
      })
      this.props.updateGame(true);
    } else {
      this.setState({
        status: "incorrect",
        answered: "beenanswered"
      })
      this.props.updateGame(false);
    }
  }
  
  render() {

    const { incorrect_answers, question, status, type } = this.state;

    if (type === "multiple") {
      return (
        <div className={`question multiple ${this.state.answered} ${this.state.status}`}>
          <div className="question-title">{question}</div>
          <div className="answers-container">
            <div onClick={()=>this.checkAnswer(incorrect_answers[0])}>{decodeHTML(incorrect_answers[0])}</div>
            <div onClick={()=>this.checkAnswer(incorrect_answers[1])}>{decodeHTML(incorrect_answers[1])}</div>
            <div onClick={()=>this.checkAnswer(incorrect_answers[2])}>{decodeHTML(incorrect_answers[2])}</div>
            <div onClick={()=>this.checkAnswer(incorrect_answers[3])}>{decodeHTML(incorrect_answers[3])}</div>
          </div>
          <div className="answer-status">
            {status}
          </div>
        </div>
      )
    } else {
      return (
        <div className={`question boolean ${this.state.answered} ${this.state.status}`}>
        <div className="question-title">{question}</div>
          <div className="answers-container">
            <div onClick={()=>this.checkAnswer("True")}>True</div>
            <div onClick={()=>this.checkAnswer("False")}>False</div>
          </div>
          <div className="answer-status">
            {status}
          </div>
        </div>
      )
    }
  }
}

