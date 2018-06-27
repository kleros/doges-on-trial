import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import './faq-group.css'

export default class FAQGroup extends PureComponent {
  static propTypes = {
    // State
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string.isRequired,
        answer: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  }

  constructor(props) {
    super(props)
    this.state = { questionsOpenFlags: this.createQuestionsOpenFlags() }
  }

  componentDidUpdate(prevProps) {
    const { questions: prevQuestions } = prevProps
    const { questions } = this.props
    if (prevQuestions !== questions)
      this.setState({ questionsOpenFlags: this.createQuestionsOpenFlags() })
  }

  createQuestionsOpenFlags = () => {
    const { questions } = this.props
    return questions.map(() => false)
  }

  handleCaretClick = ({ currentTarget: { id } }) => {
    const { questionsOpenFlags } = this.state
    const newQuestionsOpenFlags = [...questionsOpenFlags]
    newQuestionsOpenFlags[id] = !newQuestionsOpenFlags[id]
    this.setState({ questionsOpenFlags: newQuestionsOpenFlags })
  }

  render() {
    const { questions } = this.props
    const { questionsOpenFlags } = this.state
    return (
      <div className="FAQGroup">
        {questions.map((q, i) => (
          <div
            key={i}
            id={i}
            onClick={this.handleCaretClick}
            className={`FAQGroup-questionGroup ${
              questionsOpenFlags[i] ? 'is-open' : ''
            }`}
          >
            <div className="FAQGroup-questionGroup-question">{q.question}</div>
            <div className="FAQGroup-questionGroup-answer">{q.answer}</div>
            <FontAwesomeIcon
              icon="caret-down"
              className="FAQGroup-questionGroup-caret"
            />
          </div>
        ))}
      </div>
    )
  }
}
