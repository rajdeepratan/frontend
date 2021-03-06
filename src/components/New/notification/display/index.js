import React, { Component } from 'react';
import { Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';
import {connect} from 'react-redux';
import LeftView from './left-view'
import RightView from './right-view'
import Localization from '../localization';
import { fetchOneRules, createRules, updateRules, clearRules } from 'ducks/rules';
import Tabs from 'components/Template/tab'

export class Display extends Component{
  constructor(){
    super();
    this.state = {
      hideNotification: true,
      loopNotification: true,
      delayNotification: false,
      closeNotification: false,
      // hideAnonymous: false,
      // displayNotifications: false,
      initialDelay: 1,
      displayTime: 3,
      delayBetween: 3,
      displayPosition: 'bottom'
    };
    this.handleStateChange = this.handleStateChange.bind(this);
    this.saveRules = this.saveRules.bind(this);
  }

  componentDidMount() {
    if(this.props.campaign)
      this.props.fetchOneRules(this.props.campaign._id);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.rules != this.props.rules) {
      this.setRules(nextProps.rules);
    }
  }

  setRules(rules) {
    this.setState({
      hideNotification: rules.hideNotification,
      loopNotification: rules.loopNotification,
      delayNotification: rules.delayNotification,
      closeNotification: rules.closeNotification,
      initialDelay: rules.initialDelay,
      displayTime: rules.displayTime,
      delayBetween: rules.delayBetween,
      displayPosition: rules.displayPosition
    });
  }

  handleStateChange(state, value){
    this.setState({[state]: value});
  }

  saveRules() {
    const rules = !this.props.rules?null:this.props.rules;
    let rule = this.state;
    rule['campaign']=this.props.campaign._id;
    if(rules) {
      rule['id'] = rules._id;
      delete rule['campaign'];
      this.props.updateRules(rule);
    } else {
      this.props.createRules(rule);
    }
    this.props.handleNextState();
  }

  // componentWillUnmount() {
  //     this.props.clearRules();
  // }

  render(){
    const { handleBackState } = this.props;
    return (
      <div className="plain inner-display" style={{width: '97.5%', background: 'white', padding: '2% 1%'}}>
        <div className="content">
          <Row>
            <Col xs={6}>
              <LeftView
                handleStateChange={this.handleStateChange}
                {...this.state}
              />
           </Col>
            <Col xs={6}>
               <RightView
                 handleStateChange={this.handleStateChange}
                 {...this.state}
               />
            </Col>
           </Row>
           <Row style={{margin: '0px auto 10%', padding: '5% 5% 5% 0%'}}>
             <Col md={6}>
               <div className=" text-left">
                 <Button bsStyle="primary" onClick={handleBackState}>
                   <Glyphicon glyph="chevron-left" />
                   Back
                 </Button>
               </div>
             </Col>
             <Col md={6}>
               <div className=" text-right">
                <Button bsStyle="primary" onClick={this.saveRules}>
                  <Glyphicon glyph="chevron-right" />
                  Next
                </Button>
               </div>
             </Col>
           </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rules: state.getIn(['rules', 'rule']),
  campaign: state.getIn(['campaign', 'campaign']),
});

const mapDispatchToProps = {
  fetchOneRules,
  createRules,
  updateRules,
  clearRules
};

export default connect(mapStateToProps, mapDispatchToProps)(Display);
