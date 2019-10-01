import React from 'react';

function decodeHTML(html) {
	var txt = document.createElement('textarea');
	txt.innerHTML = html;
	return txt.value;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


export default class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: this.props.data.correct_answer,
      incorrect_answers: [],
      status: null
    }

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
        status: "Correct!"
      })
    } else {
      this.setState({
        status: "Incorrect!"
      })
    }
  }
  
  render() {
    if (this.props.data.type === "multiple") {
      return (
        <div className="question-container multiple">
          <div className="question-title">{decodeHTML(this.props.data.question)}</div>
          <div className="answers-container">
            <div onClick={()=>this.checkAnswer(this.props.data.incorrect_answers[0])}>{decodeHTML(this.props.data.incorrect_answers[0])}</div>
            <div onClick={()=>this.checkAnswer(this.props.data.incorrect_answers[1])}>{decodeHTML(this.props.data.incorrect_answers[1])}</div>
            <div onClick={()=>this.checkAnswer(this.props.data.incorrect_answers[2])}>{decodeHTML(this.props.data.incorrect_answers[2])}</div>
            <div onClick={()=>this.checkAnswer(this.props.data.incorrect_answers[3])}>{decodeHTML(this.props.data.incorrect_answers[3])}</div>
          </div>
          <div className="answer-status">
            {this.state.status}
          </div>
        </div>
      )
    } else {
      return (
        <div className="question-container boolean">
        <div className="question-title">{decodeHTML(this.props.data.question)}</div>
          <div className="answers-container">
            <div onClick={()=>this.checkAnswer("True")}>True</div>
            <div onClick={()=>this.checkAnswer("False")}>False</div>
          </div>
          <div className="answer-status">
            {this.state.status}
          </div>
        </div>
      )
    }
  }
}

