import React, { Component } from 'react'
import QuestCard from '../QuestCard/QuestCard'
import { Spin } from 'antd'
import { BASE_URL } from '../../settings'
import { Row, Col } from 'antd'
import {Link, Redirect} from "react-router-dom";
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function getAvatar(avatarUrl) {
  if (avatarUrl === null) {
    return (<Avatar size={128} icon={<UserOutlined />} />)
  } else {
    return (<Avatar size={128} src={avatarUrl} />)
  }
}

class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      dataReady: false,
      results: []
    }
  }

  componentDidMount () {
    fetch(BASE_URL + '/quests')
      .then(response => response.json())
      .then(readResponse => this.setState({ dataReady: true, results: readResponse }))
  }

  mapQuestsToTemplate () {
    return this.state.results.map((obj) =>
      <Col key={'quest:' + obj.id} xs={2} sm={4} md={3} lg={8} xl={100}>
        <Link to={'/quests/' + obj.id}><QuestCard quest={obj} /></Link>
      </Col>
    )
  }

  getRepresentationByState (props) {
    if (!this.state.dataReady) {
      return <Spin />
    } else {
      return (
        <React.Fragment>
          {getAvatar()}
            <div className={"content-container"}>
          {this.mapQuestsToTemplate()}
            </div>
        </React.Fragment>
      )
    }
  }

  render () {
    const redirectToAuth = (this.state.status === 401) ? (
        <Redirect from={this.props.url} to={"/auth/" + encodeURIComponent(this.props.url)} />
    ) : (<React.Fragment/>)
      return (
        <React.Fragment>
          {redirectToAuth}
          <p>
            &#160; <p>&#160;</p>
            <Row type="flex">
              {this.getRepresentationByState()}
            </Row>
          </p>
        </React.Fragment>)
      }

}

export default Home
