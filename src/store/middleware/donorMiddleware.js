import DonorActions from "./../actions/donorActions";
import AuthMiddleware from "./authMiddleware";
// import * as firebase from 'firebase';
import { instance } from "./request"
import queryString from "querystring"


export default class DonorMiddleware {

    static registerDonor(donorDetail) {
        console.log("donorDetail ", donorDetail);
       
    }

    /// Fetch Donor List Functions
    static getDonorList(token) {
        console.log("getDonorList", token);
        return (dispatch) => {
            dispatch(DonorActions.getDonorList())
            DonorMiddleware.getDonorListFromFirebase(dispatch, token);
        }
    }

    static getDonorListFromFirebase(dispatch, token) {

        instance.get("/getAllDonars", instance.defaults.headers.token = token)
            .then(response => response.data)
            .then(body => {
                console.log(body)
                 dispatch(DonorActions.addDonorToList(body))
            })
            .catch((error)=>{
                dispatch(DonorActions.getDonorDetailRejected())
            })
    }

    //Get Donor Detail
    static getDonorDetial(donorId) {
        console.log("getDonorDetial ", donorId);
        return (dispatch) => {
            dispatch(DonorActions.getDonorDetail())
           dispatch(DonorActions.getDonorDetailSuccessful(donorId))
        }
    }



}