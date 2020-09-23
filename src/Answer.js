import React from 'react';
import { decodeHTML } from './Functions'



export default class Question extends React.Component {
  state = {};
  
  
  render() {
      return (
        <>
        <div className={this.state.correct} onClick={()=> this.props.checkAnswer(this.props.answer)}>{decodeHTML(this.props.answer)}</div>
        </>
      )
  }
}

