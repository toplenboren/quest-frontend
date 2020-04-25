import React from 'react'
import './Tasks.css'

import { PropTypes } from 'prop-types'
import { Popconfirm } from 'antd'
import ReactMarkdown from 'react-markdown'

export default function Hint (props) {
  if (!props.isHidden) {
    return (
      <div className={'quest-task__container'}>
        <div className={'quest-task__typography-container'}>
          <div className={'quest-task__typography'}>
            <p>{'Подсказка: ' + props.number + ':'}</p>
            <ReactMarkdown>{props.content}</ReactMarkdown>
          </div>
        </div>
      </div>)
  } else {
    return (
      <div className={'quest-task__container'}>
        <Popconfirm
          title="За взятие подсказок мы снимаем баллы, вы точно хотите взять подсказку?"
          onConfirm={() => props.getHintCallback(props.number, props.id)}
          onCancel={() => { console.log('closed') }}
          okText="Да"
          cancelText="Нет"
        >
          <button className={'quest-task__button'}>
            <div className={'quest-task__typography__podskazka'}>
              <p>{'Подсказочку ❓'}</p>
            </div>
          </button>
        </Popconfirm>
      </div>
    )
  }
}

Hint.propTypes = {
  number: PropTypes.number,
  id: PropTypes.id,
  content: PropTypes.string,
  isHidden: PropTypes.bool,
  getHintCallback: PropTypes.func
}
