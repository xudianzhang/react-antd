import React, { Component } from 'react'
import {Row, Col} from 'antd'
import axios from '../../axios'
import Util from '../../utils/utils'
import './index.less'
import { connect } from 'react-redux'

class Header extends Component{
  componentWillMount () {
    this.setState({
      userName: 'na麽倔强'
    })
    setInterval(() => {
      let sysTime = Util.formateDate(new Date().getTime())
      this.setState({
        sysTime
      })
    }, 1000)
    this.getWeatherAPIdata()
  }

  getWeatherAPIdata () {
    let city = '北京'
    axios.jsonp({
      url: `http://api.map.baidu.com/telematics/v3/weather?location=${encodeURIComponent(city)}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    }).then((res) => {
      let data = res.results[0].weather_data[0]
      this.setState({
        dayPictureUrl: data.dayPictureUrl,
        weather: data.weather
      })
    })
  }
  render () {
    const menuType = this.props.menuType
    const breadCrumb = (
      <Row className="breadcrumb">
        <Col span="4" className="breadcrumb-title">
          {this.props.menuName}
        </Col>
        <Col span="20" className="weather">
          <span className="date">{this.state.sysTime}</span>
          <span className="weather-img">
            <img src={this.state.dayPictureUrl} alt=""/>
          </span>
          <span className="weather-detail">{this.state.weather}</span>
        </Col>
      </Row>
    )
    return (
      <div className="header">
        <Row className="header-top">
          {
            menuType ? 
                  <Col span="6" className="logo">
                    <img src="/assets/logo.gif" alt="" />
                    <span>管理系统</span>
                  </Col> : ''
          }
          <Col span={menuType? 18: 24}>
            <span>欢迎，{this.state.userName}</span>
            <a>退出</a>
          </Col>
        </Row>
        {
          menuType ? '' : breadCrumb
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    menuName: state.menuName
  }
}
export default connect(mapStateToProps)(Header)