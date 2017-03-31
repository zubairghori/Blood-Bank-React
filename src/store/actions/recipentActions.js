export default class RecipentActions {

    static REGISTER_RECIPENT_SUCCESSFUL = 'REGISTER_RECIPENT_SUCCESSFUL';
    static REGISTER_RECIPENT_REJECTED = 'REGISTER_RECIPENT_REJECTED';

    static GET_RECIPENT_LIST = 'GET_RECIPENT_LIST';
    static GET_RECIPENT_LIST_SUCCESSFUL = 'GET_RECIPENT_LIST_SUCCESSFUL';
    static GET_RECIPENT_LIST_REJECTED = 'GET_RECIPENT_LIST_REJECTED';
    static ADD_RECIPENT = 'ADD_RECIPENT';

    static GET_RECIPENT_DETAIL = 'GET_RECIPENT_DETAIL';
    static GET_RECIPENT_DETAIL_SUCCESSFUL = 'GET_DRECIPENT_DETAIL_SUCCESSFUL';
    static GET_RECIPENT_DETAIL_REJECTED = 'GET_RECIPENT_DETAIL_REJECTED';
    //static ADD_DONOR_SUCCESSFUL = 'GET_DONOR_LIST_SUCCESSFUL';
    //static ADD_DONOR_REJECTED = 'GET_DONOR_LIST_REJECTED';

   

    static registerRECIPENTSuccessful(donorObj) {
        return {
            type: RecipentActions.REGISTER_RECIPENT_SUCCESSFUL,
            payload: donorObj
        }
    }

    static registerRECIPENTRejected(error) {
        return {
            type: RecipentActions.REGISTER_RECIPENT_REJECTED,
            payload: error
        }
    }    


    static getRECIPENTToList() {
        return {
            type: RecipentActions.GET_RECIPENT_LIST
        }
    }

    static getRECIPENTListSuccessful(donorList) {
        return {
            type: RecipentActions.GET_RECIPENT_LIST_SUCCESSFUL,
            payload: donorList
        }
    }
    static getRECIPENTListRejected() {
        return {
            type: RecipentActions.GET_RECIPENT_LIST_REJECTED
        }
    }

    static addRECIPENTToList(donorObj) {
        return {
            type: RecipentActions.ADD_RECIPENT,
            payload: donorObj
        }
    }

    static getRECIPENTDetail() {
        return {
            type: RecipentActions.GET_RECIPENT_DETAIL
        }
    }

    static getRECIPENTDetailSuccessful(donorObj) {
        return {
            type: RecipentActions.GET_RECIPENT_DETAIL_SUCCESSFUL,
            payload: donorObj
        }
    }

    static getRECIPENTDetailRejected(error) {
        return {
            type: RecipentActions.GET_RECIPENT_DETAIL_REJECTED,
            payload: error
        }
    }    
}