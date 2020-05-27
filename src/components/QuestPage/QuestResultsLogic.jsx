import React, {Component} from 'react'
import {Col, Divider, Row, Spin, Table} from 'antd'
import './QuestDescription.css'
import {TrophyOutlined} from '@ant-design/icons'
import QuestDescriptionTemplate from './QuestDescriptionTemplate'
import { fetchScoreboard } from '../../redux/Actions/ScoreboardApi'
import { connect } from 'react-redux'

const columns = [
    {
        title: '',
        dataIndex: 'cup',
        width: 5
    },
    {
        title: '',
        dataIndex: 'place',
        width: 5
    },
    {
        title: '',
        dataIndex: 'name'
    },
    {
        title: '',
        dataIndex: 'score',
        width: 5
    }
];

class QuestResultsLogic extends Component {

    componentDidMount() {
        this.props.fetchScoreboard(this.props.id)
    }

    mapResults() {
        if (this.props.scoreboardIsFetching)
            return <Spin/>;
        else {
            if (this.props.scoreboard === null || this.props.scoreboard === undefined)
                return <Spin/>;
            else {
                const a = Object.values(this.props.scoreboard.teamResults);
                //возможно, здесь надо будет просто this.props.scoreboard, но пока хз
                a.forEach(x => x.place += 1);
                return a;
            }
        }
    }

    getCup(place) {
        switch (place) {
            case 1:
                return <TrophyOutlined style={{"color": "#FA8C16"}}/>;
            case 2:
                return <TrophyOutlined style={{"color": "#595959"}}/>;
            case 3:
                return <TrophyOutlined style={{"color": "#5C0011"}}/>;
            default:
                return ''
        }
    }

    getCol(col) {
        return <Col span={11}>
            <div>
                <Table
                    columns={columns}
                    dataSource={col}
                    pagination={false}
                    showHeader={false}
                />
            </div>
        </Col>
    }

    getRepresentationByState() {
        let heading;
        let description;
        let results;
        const a = this.mapResults();
        const col1 = [];
        const col2 = [];
        a.forEach((x) => x['cup'] = this.getCup(x.place));
        a.forEach((x) => {
            if (parseInt(x.place) < a.length / 2 + 1) col1.push(x); else col2.push(x)
        });
        heading = <svg width="170" height="32" viewBox="0 0 217 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M0.725852 28H5.73224V18.6619H11.022C17.4048 18.6619 20.8324 14.8295 20.8324 9.51278C20.8324 4.23651 17.4453 0.363636 11.0895 0.363636H0.725852V28ZM5.73224 14.5462V4.54688H10.3203C14.0717 4.54688 15.7315 6.57102 15.7315 9.51278C15.7315 12.4545 14.0717 14.5462 10.3473 14.5462H5.73224ZM33.8443 28.4048C38.6752 28.4048 41.9949 26.0433 42.8585 22.4403L38.2974 21.9276C37.6362 23.6818 36.0169 24.5994 33.9118 24.5994C30.7541 24.5994 28.6625 22.5213 28.622 18.9723H43.0609V17.4744C43.0609 10.201 38.6887 7.00284 33.5879 7.00284C27.6504 7.00284 23.7775 11.3615 23.7775 17.7578C23.7775 24.2621 27.5964 28.4048 33.8443 28.4048ZM28.6355 15.6797C28.7839 13.0348 30.7406 10.8082 33.6554 10.8082C36.4622 10.8082 38.3514 12.8594 38.3784 15.6797H28.6355ZM46.0465 22.3189C46.168 26.1648 49.69 28.4048 54.4805 28.4048C59.3924 28.4048 62.9414 26.0703 62.9414 22.2514C62.9414 19.4581 61.0387 17.5419 58.5827 17.3935V17.1776C60.9577 16.5433 62.4691 15.0589 62.4691 12.8189C62.4691 9.32386 59.4464 7.00284 54.5884 7.00284C50.0543 7.00284 46.6403 9.35085 46.5728 12.9673H51.3903C51.4442 11.5774 52.8746 10.6058 54.8178 10.6058C56.761 10.6058 57.935 11.6449 57.935 13.1832C57.935 14.6001 56.8555 15.6527 54.8313 15.6527H51.6602V19.1207H54.8313C56.869 19.1207 58.2049 20.2678 58.2049 21.9411C58.2049 23.8303 56.5451 24.7479 54.4535 24.7479C52.3888 24.7479 50.9854 23.8572 50.891 22.3189H46.0465ZM69.8235 35.7322C73.6289 35.7322 75.8285 33.7621 77.0025 30.5099L85.3285 7.29972L80.1062 7.27273L75.3157 22.9261H75.0998L70.3228 7.27273H65.141L72.6573 28.4318L72.239 29.5518C71.3079 31.8459 69.9045 32.0213 67.7724 31.4141L66.6388 35.206C67.3001 35.4893 68.4876 35.7322 69.8235 35.7322ZM85.6186 28H87.13C91.5831 28 93.5938 24.8693 93.9176 17.9602L94.2415 11.2805H100.192V28H104.915V7.27273H89.8018L89.4375 16.4489C89.2081 22.2649 88.4524 23.9787 86.3068 23.9787H85.5916L85.6186 28ZM114.544 14.0199V7.27273H109.834V28H119.253C124.529 28 127.566 25.0852 127.579 21.0099C127.566 16.8267 124.529 14.0199 119.253 14.0199H114.544ZM114.544 18.0277H119.253C121.372 18.0277 122.897 19.2827 122.897 21.0774C122.897 22.7912 121.372 23.9922 119.253 23.9922H114.544V18.0277ZM128.48 11.2805H135.187V28H139.91V11.2805H146.616V7.27273H128.48V11.2805ZM155.617 28.4183C158.869 28.4183 160.812 26.8935 161.703 25.1527H161.865V28H166.561V14.1278C166.561 8.64915 162.094 7.00284 158.14 7.00284C153.782 7.00284 150.435 8.94602 149.356 12.7244L153.917 13.3722C154.403 11.9553 155.779 10.7408 158.167 10.7408C160.434 10.7408 161.676 11.9013 161.676 13.9389V14.0199C161.676 15.4233 160.205 15.4908 156.548 15.8821C152.527 16.3139 148.681 17.5149 148.681 22.1839C148.681 26.2592 151.663 28.4183 155.617 28.4183ZM156.885 24.8288C154.848 24.8288 153.39 23.8977 153.39 22.103C153.39 20.2273 155.023 19.4446 157.209 19.1342C158.491 18.9588 161.055 18.6349 161.689 18.1222V20.5646C161.689 22.8722 159.827 24.8288 156.885 24.8288ZM169.152 11.2805H175.858V28H180.581V11.2805H187.288V7.27273H169.152V11.2805ZM195.887 14.0199V7.27273H191.178V28H200.597C205.873 28 208.909 25.0852 208.923 21.0099C208.909 16.8267 205.873 14.0199 200.597 14.0199H195.887ZM211.5 28H216.385V7.27273H211.5V28ZM195.887 18.0277H200.597C202.716 18.0277 204.24 19.2827 204.24 21.0774C204.24 22.7912 202.716 23.9922 200.597 23.9922H195.887V18.0277Z"
                fill="black"/>
        </svg>;
        description = <p>В таблице указана разность количества баллов команды и баллов первого места</p>;
        results = <Row>
            {this.getCol(col1)}
            <div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;</div>
            {this.getCol(col2)}
        </Row>;
        return <QuestDescriptionTemplate heading={heading}
                                         description={description}
                                         results={results}/>
    }
    render() {
        return (
            <React.Fragment>
                {this.getRepresentationByState()}
            </React.Fragment>)
    }
}

const mapStateToProps = (store) => ({
    scoreboard: store.scoreboardReducer().quest,
    scoreboardIsFetching: store.scoreboardReducer.isFetching,
});

const mapDispatchToProps = dispatch => ({
    fetchScoreboard: (id) => dispatch(fetchScoreboard(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestResultsLogic)
