import React, { Component,PropTypes } from 'react';
//import styles from './Login-css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as MUI from 'material-ui'
import AppTheme from '../../app-theme';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import Help from 'material-ui/svg-icons/action/help';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import './Login.css';
import {grey500} from 'material-ui/styles/colors';
import {red800} from 'material-ui/styles/colors';
import { AuthMiddleware } from '../../store'
import blood from  "../../images/blood.jpg"
function mapStateToProps(state) {
    return {
        isAuthenticated: state.AuthReducer.isAuthenticated,
        isLoading: state.AuthReducer.isProcessing
    };
}

function mapDispatchToProps(dispatch) {
    return {
        signin: (credentials) => dispatch(AuthMiddleware.signin(credentials))
    };
}

class Login extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(){
    super();
    this.handelSignin = this.handelSignin.bind(this);
  }

  componentWillReceiveProps(nextProps){
    setTimeout(()=> {
      if(this.props.isAuthenticated){
        console.log("Authenticated true in signup");
          this.context.router.push("/dashboard");
      }
    },0);
  }

  handelSignin() {
    this.props.signin(
      {
        "email":this.refs.email.getValue(),
        "password":this.refs.password.getValue()
      });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={AppTheme}>          
      <div>
        {this.props.isLoading?<MUI.CircularProgress size={80} thickness={5} style={{marginLeft:"50%",marginTop:"140px"}} />: <div className="long-loginContainer">
          <MUI.Paper className="long-paper" >
            <img src={blood} width="50%" style={{margin:"0 auto"}}/>
            <form>
              <MUI.TextField
                ref="email"
                hintText="E-mail"
                floatingLabelStyle={{color: red800}}
                floatingLabelText="E-mail"
                fullWidth={true}
              />
              <MUI.TextField
                ref="password"
                hintText="Password"
                 floatingLabelStyle={{color: red800}}
                floatingLabelText="Password"
                fullWidth={true}
                type="password"
              />

              <div>
                <MUI.Checkbox
                  label="Remember me"
                  className="long-checkRemember"
                  labelStyle={{color: grey500}}
                  iconStyle={{color: grey500,borderColor: grey500, fill: grey500}}
                />
                
                  <MUI.RaisedButton label="Login"
                                backgroundColor="#802000"
                                 labelColor="white"
                                className="long-loginBtn"
                                onTouchTap={this.handelSignin}/>
              </div>
            </form>
          </MUI.Paper>

          <div className="long-buttonsDiv">
          <Link to="/signup">
              <MUI.FlatButton
                label="Register"           
                className="long-flatButton"
                icon={<PersonAdd />}
                iconStyle={{color:red800}}
              />
            </Link>
            <MUI.FlatButton
              label="Forgot Password?"
              className="long-flatButton"
              icon={<Help />}
            />
          </div>

          
        </div>}
       
      </div>
      </MuiThemeProvider>      
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
