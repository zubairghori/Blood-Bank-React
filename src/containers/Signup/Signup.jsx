import React, { Component, PropTypes } from 'react';
import './Signup.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as MUI from 'material-ui'
import AppTheme from '../../app-theme';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { AuthMiddleware } from '../../store'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import MenuItem from 'material-ui/MenuItem';

function mapStateToProps(state) {
  return {
    isRegistered: state.AuthReducer.isRegistered,
    isLoading: state.AuthReducer.isProcessing
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signup: (credentials) => dispatch(AuthMiddleware.signup(credentials))
  };
}

class Signup extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor() {
    super();
    this.handelSignup = this.handelSignup.bind(this);
    this.state = {
      blood: "A+", logged: true, finished: false,
      stepIndex: 0,
      value: "O",
      Sex: "Male",
      Data: {},
      donor: false,
    }
  }


  Donor = () => {
    this.setState({
      donor: !this.state.donor
    })

  }
  handelSignup(ev) {
    ev.preventDefault()
    let rhType = null
    // this.props.context.push("/login")
  }
  handleCancel = (ev) => {
    this.context.router.push("/login");
    // console.log("Hello world");
  }
  handleNext = (ev) => {
    ev.preventDefault()
    const { stepIndex } = this.state;
    this.setState({
      finished: stepIndex >= 2,
    });
    if (stepIndex === 2) {
      this.props.signup(this.state.Data)
      console.log(this.state.Data)
    }



    switch (stepIndex) {
      case 0:
        if (this.refs.fullName.getValue() === "" || this.refs.email.getValue() === "" || this.refs.password.getValue() === "") {
          alert("Please Complete Form")
        }
        else {
          let rhType = null
          if (this.state.blood.split("")[1] === "+") {
            rhType = true
          }
          else {
            rhType = false
          }
          var copyData = Object.assign({ fullName: this.refs.fullName.getValue(), password: this.refs.password.getValue(), email: this.refs.email.getValue(), rhType: rhType, bloodGroup: this.state.value, donor: this.state.donor }, this.state.Data)
          const { stepIndex } = this.state;
          this.setState({
            stepIndex: stepIndex + 1,
            Data: copyData
          })
        }

        break;
      case 1:
        if (this.refs.mNumber.getValue() === "" || this.refs.age.getValue() === "") {
          alert("Please Complete Form")
        }
        else {
          var copyData = Object.assign({ mobileNumber: this.refs.mNumber.getValue(), age: this.refs.age.getValue() }, this.state.Data)
          const { stepIndex } = this.state;
          this.setState({
            stepIndex: stepIndex + 1,
            Data: copyData
          })
        }
        break;
      case 2: {

        const { stepIndex } = this.state;
        this.setState({
          stepIndex: stepIndex + 1
        })
        break;
      }
      default:
        console.log("Something Went Wrong")
    }
  };
  componentWillReceiveProps(nextProps) {
    setTimeout(() => {
      if (this.props.isRegistered) {
        console.log("isRegistered true in signup");
        this.context.router.push("/login");
      }
    }, 0);
  }
  handleChangeBlood = (event, index, blood) => this.setState({ blood });
  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <form onSubmit={this.handleNext}>  <TextField
              hintText="Enter Your Full Name"
              floatingLabelText="Full Name"
              floatingLabelStyle={{ color: "#802000" }}
              multiLine={false} ref="fullName" /> <br />
              <TextField
                hintText="Enter Your Email"
                floatingLabelText="Email"
                floatingLabelStyle={{ color: "#802000" }}
                multiLine={false}
                type="email"
                required ref="email" /> <br />
              <TextField
                hintText="Enter Password"
                floatingLabelText="Password"
                floatingLabelStyle={{ color: "#802000" }}
                multiLine={false}
                type="password" ref="password" /> <br />
              <MUI.SelectField
                floatingLabelText="Blood Group"
                value={this.state.blood}
                onChange={this.handleChangeBlood}
              >
                <MUI.MenuItem value={"A+"} primaryText="A+" />
                <MUI.MenuItem value={"A-"} primaryText="A-" />
                <MUI.MenuItem value={"B+"} primaryText="B+" />
                <MUI.MenuItem value={"B-"} primaryText="B-" />
                <MUI.MenuItem value={"O+"} primaryText="O+" />
                <MUI.MenuItem value={"O-"} primaryText="O-" />
              </MUI.SelectField>
              <br />
              <br />
              <Toggle
                label="Donor"
                defaultToggled={false}
                onToggle={this.Donor}
              /> <br /><br />

              <div style={{ marginTop: 12 }}>

                <RaisedButton
                  label='Next'
                  backgroundColor="#802000"
                  style={{ marginLeft: "10px" }}
                  labelColor="white"
                  type="submit"
                /> <RaisedButton
                  label='Cancel'
                  backgroundColor="#802000"
                  labelColor="white"
                  onTouchTap={this.handleCancel}
                />
              </div>
            </form>

          </div>
        );
      case 1:
        return (
          <div>
            <MUI.TextField
              ref="mNumber"
              hintText="Mobile Number"
              floatingLabelText="Mobile Number"
              fullWidth={true}
              required
              type="Number"
            />
            <MUI.TextField
              ref="age"
              hintText="Age"
              floatingLabelText="Age"
              fullWidth={true}
              required
              type="Number"
            /><br />
            <br />
            <div style={{ marginTop: 12 }}>

              <RaisedButton
                label='Next'
                backgroundColor="#802000"
                labelColor="white"
                style={{ marginLeft: "10px" }}
                onTouchTap={this.handleNext}
              />  <RaisedButton
                label='Cancel'
                backgroundColor="#802000"
                labelColor="white"
                onTouchTap={this.handleCancel}
              />
            </div>
          </div>);
      case 2:
        return (
          <div>
            Are You Sure Complete Registration ?
            <div style={{ marginTop: 12 }}>

              <RaisedButton
                label='Finish'
                backgroundColor="#802000"
                labelColor="white"
                onTouchTap={this.handleNext}
              />
            </div>
          </div>
        );

      default:
        return 'Something Went Wrong!';
    }
  }
  handleChangeBlood = (event, index, blood) => this.setState({ blood });

  render() {
    console.log("Authenticated FALSE in signup");
    const contentStyle = { margin: '0 16px' };
    const { finished, stepIndex } = this.state;
    return (

      <MuiThemeProvider muiTheme={AppTheme}>
        <div>
          {this.props.isLoading ? <MUI.CircularProgress size={80} thickness={5} style={{ marginLeft: "50%", marginTop: "140px" }} /> : <MUI.Paper className="signup-paper"> <div style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
            <h1 style={{ textAlign: "center" }}> User Registration </h1>
            <MUI.Stepper activeStep={stepIndex}>
              <MUI.Step>
                <MUI.StepLabel>Basic Details</MUI.StepLabel>
              </MUI.Step>

              <MUI.Step>
                <MUI.StepLabel>Other Details</MUI.StepLabel>
              </MUI.Step>

            </MUI.Stepper>
            <div style={contentStyle}>
              {finished ? (
                <div>
                  <p> Congratulations !! You Successfully Completed Registration <Link to="/signin"> Sign In </Link> </p>
                </div>
              ) : (
                  <div>
                    <div>{this.getStepContent(stepIndex)}</div>

                  </div>
                )}
            </div>

          </div>
          </MUI.Paper>
          }
        </div>
      </MuiThemeProvider>
    );
  }
}

//export default Signup;
export default connect(mapStateToProps, mapDispatchToProps)(Signup)
