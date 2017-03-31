import RecipentActions from "./../actions/recipentActions";

const INITIAL_STATE = {
    //authUser: {},
    isProcessing : false,
    isError : false,
    errorMessage: {},
    RecipentList: [],
    recipentDetail : {},
    isDetailUpdated: false,
}

function RecipentReducer(state = INITIAL_STATE, action) {
    switch(action.type) {        
        case RecipentActions.REGISTER_RECIPENT:
            return {...state, isProcessing: true, isError : false,isDetailUpdated:false};
        case RecipentActions.REGISTER_RECIPENT_SUCCESSFUL:
            return {...state, isProcessing: false ,isError : false, errorMessage: {},isDetailUpdated:true};            
        case RecipentActions.REGISTER_RECIPENT_REJECTED:
            return {...state, isProcessing: false, isError : true, errorMessage: action.payload,isDetailUpdated:false};         
        case RecipentActions.GET_RECIPENT_LIST:
            return {...state, isProcessing: true, isError : false,RecipentList:[]};
        case RecipentActions.GET_RECIPENT_LIST_REJECTED:
             return {...state, isProcessing: false, isError : true, RecipentList:[]};
        case RecipentActions.GET_RECIPENT_LIST_SUCCESSFUL:
            return {...state, isProcessing: false, isError : false, RecipentList:action.payload};
        case RecipentActions.ADD_RECIPENT:
            var newRecipentList = [...state.RecipentList];
            newRecipentList.push(action.payload);
            return {...state, isProcessing: false, isError : false, RecipentList:newRecipentList};
        case RecipentActions.GET_RECIPENT_DETAIL:
            return {...state, isProcessing: true, isError : false, RecipentDetail: {}};
        case RecipentActions.GET_RECIPENT_DETAIL_SUCCESSFUL:
            return {...state, isProcessing: false ,isError : false, errorMessage: {},recipentDetail:action.payload};            
        case RecipentActions.GET_RECIPENT_DETAIL_REJECTED:
            return {...state, isProcessing: false, isError : true, errorMessage: action.payload, RecipentDetail:{}};
        default:
            return state;
    }
}

export default RecipentReducer;