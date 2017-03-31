import React, { Component, PropTypes } from 'react';
import './Navigation.css';
import * as MUI from 'material-ui'
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import ADD_SHOPPING from 'material-ui/svg-icons/action/add-shopping-cart';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import Web from 'material-ui/svg-icons/av/web';
import { AuthMiddleware } from '../../store'
import LocalStorageManager from '../../services/localStorageManager'
import applic from "../../images/01.png"

function mapStateToProps(state) {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated,
    authUser: state.AuthReducer.authUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(AuthMiddleware.logout()),
  };
}

class Navigation extends Component {
  constructor() {
    super()
    this.state = {
      open: false,
      Users: LocalStorageManager.getUser()

    };
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentWillReceiveProps(nextProps) {

    setTimeout(() => {

      if (!this.props.isAuthenticated) {
        console.log("Logout true");
        this.context.router.push("/login");
      }
    }, 0);
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  /*
  handelSignin() {
    this.props.logout();
  }*/
  drawerMenu() {
    return (
      <div className="nav-bar">
        <div className="navigation-avatar-div">
          <Avatar src="https://avatars0.githubusercontent.com/u/13614942?v=3&s=400"
            size={50}
            className="navigation-icon" onTouchTap={this.handleOpen} />
          <span className="navigation-span">{this.state.Users.data.user.name}</span><br />
            <span className="navigation-span">Blood Group:  {this.state.Users.data.user.bgType}</span><br />
            <span className="navigation-span">{this.state.Users.data.user.userType?"Donor":"Recipent"}</span><br /><br />

        </div>
        <MUI.MenuItem
          className="navigation-menuItem"
          primaryText="Dashboard"
          leftIcon={<Dashboard />}
          containerElement={<Link to="/dashboard" />}
        />

        <MUI.MenuItem
          className="navigation-menuItem"
          primaryText="Donors"
          leftIcon={<ADD_SHOPPING />}
          containerElement={<Link to="/dashboard/donorlist" />}
        />
        <MUI.MenuItem
          className="navigation-menuItem"
          primaryText="Recipent"
          style={{marginBottom:"100px"}}
          leftIcon={<Web />}
          containerElement={<Link to="/dashboard/recipent" />}
        />
        <img src={applic} width="100%"/>
      </div>
    );
  }

  render() {
    const actions = [
      <MUI.FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];

    return (
      <div className="navigation-container">
        <MUI.AppBar style={{ backgroundColor: '#802000'}} title="Blood Bank System"
          onLeftIconButtonTouchTap={this.props.drawerToggle}
          iconElementRight={<MUI.FlatButton label="Sign out" onTouchTap={this.props.logout} />}
          onRightIconButtonTouchTap={() => this.context.router.push("/login")}
        />
        <MUI.Drawer open={this.props.drawerOpen} docked={false}
          onRequestChange={this.props.drawerToggle}>
          {this.drawerMenu()}
        </MUI.Drawer>
        <MUI.Dialog
          title="Your Profile Information"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <div style={{ marginLeft: "70px" }}><Avatar src="https://avatars0.githubusercontent.com/u/13614942?v=3&s=400"
            size={120}
            className="navigation-icon" />

            <strong>Name: </strong> {this.state.Users.data.user.name} <br />
          <strong>Age: </strong> {this.state.Users.data.user.age}<br />
           <strong>Mobile Number: </strong> {this.state.Users.data.user.no} <br />
          <strong>Blood Group: </strong> {this.state.Users.data.user.bgType} <br />
          <strong>Email: </strong> {this.state.Users.data.user.email} <br /><br />
          <strong>User Type: </strong> {this.state.Users.data.user.userType?"Donar":"Recipent"} <br />
          </div>
        </MUI.Dialog>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
