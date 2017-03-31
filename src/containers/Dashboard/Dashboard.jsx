import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Dashboard.css';
import { DonorMiddleware } from '../../store'
import {RecipentMiddleware} from "../../store"
import {AuthMiddleware} from "../../store"
function mapStateToProps(state) {
    return {
        isAuthenticated: state.AuthReducer.isAuthenticated,
        authUser: state.AuthReducer.authUser,
        donorList: state.DonorReducer.donorList,
        isDonorError: state.DonorReducer.isError,
        donorDetail: state.DonorReducer.donorDetail,
        isLoading: state.AuthReducer.isProcessing,
        isDetailUpdated: state.DonorReducer.isDetailUpdated,
        isRecipentError: state.RecipentReducer.isError,
        recipentList: state.RecipentReducer.RecipentList,
        RecipentDetail: state.RecipentReducer.recipentDetail
    };
}

function mapDispatchToProps(dispatch) {
    return {
        registerDoner: (donorDetail) => dispatch(DonorMiddleware.registerDonor(donorDetail)),
        getDonorList: (bloodGroup) => dispatch(DonorMiddleware.getDonorList(bloodGroup)),
        getRecipentList: (bloodGroup) => dispatch(RecipentMiddleware.getRecipentList(bloodGroup)),
        getDonorDetail: (donorId) => dispatch(DonorMiddleware.getDonorDetial(donorId)),
        getRecipentDetail: (detail) => dispatch(RecipentMiddleware.getRecipentDetail(detail)),
        logout: () => dispatch(AuthMiddleware.logout()),
    };
}


class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard-container">
        {this.props.children?React.cloneElement(this.props.children, {...this.props}):this.props.children}
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
//export default Dashboard;
