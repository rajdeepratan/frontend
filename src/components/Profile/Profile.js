import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from 'react-bootstrap';
import CardHeader from 'components/Template/card-with-header'
import FormInputs from 'components/Template/FormTemp';
import Button from 'components/Template/customButton';
import {ToastContainer, toast} from 'react-toastify';

import './Profile.css';
import { fetchProfile, updateProfile } from 'ducks/profile';

// function validate(username, website) {
//   // true means invalid, so our conditions got reversed
//   return {
//     name: username.length === 0,
//     email: !website
//   };
// }

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      plan: '',
      state: '',
      address: '',
      phoneNumber: '',
      companyName: '',
      profileState: 'edit'
    };
    props.fetchProfile();
  }

  plansList() {
    const planList = this.props.planList;
    const profile = this.props.profile?this.props.profile:this.state;
    return (
      <FormControl componentClass="select" placeholder="select" value={profile?profile.plan:null} disabled={true} >
        <option value="select">Select Plan</option>
        {planList ?
          planList.map(plan => {
            return <option value={plan._id}>{plan.planName}</option>
          })
        :
          null
        }
      </FormControl>
    )
  }

  componentWillMount(){
    if(this.props.profile)
      this.setProfile(this.props.profile);
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.profile != nextProps.profile)
      this.setProfile(nextProps.profile)
  }

  setProfile(profile) {
    this.setState({
      firstName: profile.firstName,
      lastName: profile.lastName,
      plan: profile.plan,
      state: profile.state,
      address: profile.address,
      phoneNumber: profile.phoneNumber,
      companyName: profile.companyName
    });
  }

  updateProfile(e) {
    e.preventDefault();
    const { firstName, lastName, state, address, phoneNumber, companyName } = this.state;
    let profile = {
      id: this.props.profile._id,
      firstName: firstName,
      lastName: lastName,
      state: state,
      address: address,
      phoneNumber: phoneNumber,
      companyName: companyName,
    };
    this.props.updateProfile(profile);
    return;
  }

  handleStateChange(e) {
    this.setState({[e.target.id]:e.target.value});
  }

  handleEditState(e, value) {
    if(value == 'save') {
      this.setState({profileState: 'edit'});
      this.updateProfile(e);
    } else {
      this.setState({profileState: 'save'});
    }
  }

  render() {
    // const errors = validate(this.state.username, this.state.plan);
    const isDisabled = this.state.profileState=='edit'?true:false;
    const profile = this.state;
    const username = this.props.user?this.props.user.username:null;

    return (
      <div className="content fill">
        <Grid fluid="fluid">
          <Row>
            <Col md={12}>
              <CardHeader title="Profile Page" content={
                <div className="profile-container">
                  <div className="profile-over-button">
                    <Button
                      bsStyle="info"
                      pullRight
                      fill
                      type="button"
                      icon="usd"
                      disabled={true}
                      >
                      Billing
                    </Button>
                    <Button
                      bsStyle="info"
                      pullRight
                      fill
                      type="button"
                      icon="cloud-upload"
                      disabled={true}
                      >
                      Upgrade
                    </Button>
                  </div>
                  <div>

                  </div>
                  <form>
                    <Row>
                      <div className="col-md-6">
                        <FormGroup>
                          <ControlLabel>Username</ControlLabel>
                          <FormControl
                            type="text"
                            value={username}
                            placeholder="Enter username"
                            disabled={true}
                            id="username"
                          />
                        </FormGroup>
                      </div>
                      <div className="col-md-6">
                        <FormGroup controlId="formControlsSelect">
                          <ControlLabel>Plan</ControlLabel>
                          {this.plansList()}
                        </FormGroup>
                      </div>
                    </Row>
                    <Row>
                      <div className="col-md-6">
                        <FormGroup>
                          <ControlLabel>First Name</ControlLabel>
                          <FormControl
                            type="text"
                            value={profile.firstName}
                            placeholder="Enter First Name"
                            disabled={isDisabled}
                            id="firstName"
                            onChange={(e) => this.handleStateChange(e)}
                          />
                        </FormGroup>
                      </div>
                      <div className="col-md-6">
                        <FormGroup>
                          <ControlLabel>Last Name</ControlLabel>
                          <FormControl
                            type="text"
                            value={profile.lastName}
                            placeholder="Enter Last Name"
                            disabled={isDisabled}
                            id="lastName"
                            onChange={(e) => this.handleStateChange(e)}
                          />
                        </FormGroup>
                      </div>
                    </Row>
                    <Row>
                      <div className="col-md-6">
                        <FormGroup>
                          <ControlLabel>Address</ControlLabel>
                          <FormControl
                            type="text"
                            value={profile.address}
                            placeholder="Enter Address"
                            disabled={isDisabled}
                            id="address"
                            onChange={(e) => this.handleStateChange(e)}
                          />
                        </FormGroup>
                      </div>
                      <div className="col-md-6">
                        <FormGroup>
                          <ControlLabel>State</ControlLabel>
                          <FormControl
                            type="text"
                            value={profile.state}
                            placeholder="Enter State"
                            disabled={isDisabled}
                            id="state"
                            onChange={(e) => this.handleStateChange(e)}
                          />
                        </FormGroup>
                      </div>
                    </Row>
                    <Row>
                      <div className="col-md-6">
                        <FormGroup>
                          <ControlLabel>Phone Number</ControlLabel>
                          <FormControl
                            type="text"
                            value={profile.phoneNumber}
                            placeholder="Enter Phone Number"
                            disabled={isDisabled}
                            id="phoneNumber"
                            onChange={(e) => this.handleStateChange(e)}
                          />
                        </FormGroup>
                      </div>
                      <div className="col-md-6">
                        <FormGroup>
                          <ControlLabel>Company Name</ControlLabel>
                          <FormControl
                            type="text"
                            value={profile.companyName}
                            placeholder="Enter Company Name"
                            disabled={isDisabled}
                            id="companyName"
                            onChange={(e) => this.handleStateChange(e)}
                          />
                        </FormGroup>
                      </div>
                    </Row>
                    <Button
                      bsStyle="info"
                      pullRight
                      fill
                      type="button"
                      icon={this.state.profileState=='save'?'save':'edit'}
                      onClick={(e) => this.handleEditState(e, this.state.profileState)}
                      >
                      {this.state.profileState=='save'?'Save':'Edit'}
                    </Button>
                    <div className="clearfix"></div>
                  </form>
                </div>
              }/>
            </Col>
          </Row>
        </Grid>
        <ToastContainer hideProgressBar={true}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.getIn(['profile', 'profile']),
  user: state.getIn(['auth', 'user']),
  planList: state.getIn(['plan', 'plan'])
});

const mapDispatchToProps = {
  fetchProfile,
  updateProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
