import RecipentActions from "./../actions/recipentActions";
import AuthMiddleware from "./authMiddleware";
// import * as firebase from 'firebase';
import {instance} from "./request"
import queryString from "querystring"

export default class RecipentMiddleware {

    /// Fetch Recipent List Functions
    static getRecipentList(bloodGroup) {
        console.log("getDonorList ",bloodGroup);
         return (dispatch) => {
           dispatch(RecipentActions.getRECIPENTToList())
            RecipentMiddleware.getRecipentListFromDatabase(dispatch,bloodGroup);            
         }
        
    }

    static getRecipentListFromDatabase(dispatch,bloodGroup){
        instance("/getAllRecipients",{ headers: { token: bloodGroup } })
        .then(response => response.data)
        .then(body =>{
            if(!body)
            {
                console.log("Eror")
            }
            else
            {
                console.log(body)
                dispatch(RecipentActions.addRECIPENTToList(body))
            }
        })
        .catch(error => {
             dispatch(RecipentActions.getRECIPENTListRejected())
        })
        console.log(bloodGroup)
    }

    //Get Donor Detail
    static getRecipentDetail(donorId) {
        console.log("getDonorDetial ",donorId);
        return (dispatch) => {
            dispatch(RecipentActions.getRECIPENTDetail())
            dispatch(RecipentActions.getRECIPENTDetailSuccessful(donorId))
            // RecipentMiddleware.getDonorDetailFromFirebase(dispatch,donorId);            
        }
    }

}