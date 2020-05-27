import React, { Component } from 'react'
import InfiniteQuestTemplate from "./InfiniteQuestTemplate";
import QuestDescriptionLogic from './QuestDescriptionLogic'
import QuestMinimalInfo from './QuestMinimalInfo'
import {  Spin } from 'antd'
import {  CLIENT_URL } from '../../settings'
import QuestModalReg from './QuestModalReg'
import TeamList from './TeamList'
import { getToken } from '../../api/CommonApi.js';
import MetaTags from '../shared/MetaTags/MetaTags'
import QuestTimelineProcess from "./QuestTimelineProcess";
import { fetchQuestInfo } from '../../api/QuestsApi'
import { connect } from 'react-redux'



class QuestPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      regVisible: false,
      successVisible: false,
      registered: false,
    }
  }

  setRegVisible () {
    this.setState({ regVisible: true })
  }

  setSuccessVisible () {
    this.setState({ successVisible: true })
  }

  setRegUnVisible () {
    this.setState({ regVisible: false })
  }

  setSuccessUnVisible () {
    this.setState({ successVisible: false })
  }

  getMetaData () {
    if (this.state.dataReady) {
      const metaData = {
        title: this.state.quest.name,
        description: 'Квест на Квестспейсе',
        keywords: 'квест',
        robots: '',
        canonicalUrl: CLIENT_URL
      }
      return (<MetaTags metaData={metaData} />)
    } else {
      return <MetaTags/>
    }
  }

  componentDidMount () {
    this.props.fetchQuestFromRedux(this.props.match.params.id)
}

getRepresentationByState () {
  let timing;
  let team;
  if (this.props.questFromReduxIsFetching)
    return <Spin/>
  else {
    if(this.props.questFromRedux!== null){
      if(this.props.questFromRedux.teams!== undefined)
      this.props.questFromRedux.teams.forEach((x) => x.members.forEach((y) => {if(y === this.props.user.id) this.state.registered = true}));

      if (this.props.questFromRedux.type !== "solo")
        team = <TeamList quest={this.props.questFromRedux}/>;
      else
        team = '';
    if (!this.props.questFromRedux.isInfinite) {
      timing = <QuestTimelineProcess quest={this.props.questFromRedux} registered={this.state.registered}
                                     regVisible={this.props.regVisible}
                                     successVisible={this.props.successVisible}
                                     setRegVisible={() => this.setRegVisible()}
                                     setSuccessVisible={() => this.setSuccessVisible()}
                                     setRegUnVisible={() => this.setRegUnVisible()}
                                     setSuccessUnVisible={() => this.setSuccessUnVisible()}
                                     quest_id={this.props.questFromRedux.id}
                                     url={'quests/' + this.props.questFromRedux.id}
      />
    } else timing = <InfiniteQuestTemplate quest={this.props.questFromRedux}/>;
      return (
          <React.Fragment>
            <QuestMinimalInfo quest={this.props.questFromRedux}/>
            <h2>
              {timing}
            </h2>
            <QuestDescriptionLogic quest={this.props.questFromRedux}/>
            {team}
            <QuestModalReg
                regVisible={this.state.regVisible}
                successVisible={this.state.successVisible}
                setRegVisible={() => this.setRegVisible()}
                setSuccessVisible={() => this.setSuccessVisible()}
                setRegUnVisible={() => this.setRegUnVisible()}
                setSuccessUnVisible={() => this.setSuccessUnVisible()}
                quest_id={this.props.questFromRedux.id}
                url={'quests/' + this.props.questFromRedux.id}
            />
          </React.Fragment>
      )
  }}
}

  render () {
    return (
      <React.Fragment>
        {this.getMetaData()}
        {this.getRepresentationByState()}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (store) => ({
  questFromRedux: store.questsReducer.quest,
  questFromReduxIsFetching: store.questsReducer.isFetching,
  user: store.authReducer.user
})

const mapDispatchToProps = dispatch => ({
  fetchQuestFromRedux: (id) => dispatch(fetchQuestInfo(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestPage)
