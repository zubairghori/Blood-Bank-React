import AuthActions from "./../actions/authActions";
import LocalStorageManager from '../../services/localStorageManager'
import {instance} from "./request"

export default class AuthMiddleware {

    /// Singup Functions start
    static signup(credentials) {
        console.log("test ", credentials);
        return (dispatch) => {
            dispatch(AuthActions.signup())
            AuthMiddleware.registerUserOn(dispatch, credentials)
        }
        
    }

    static registerUserOn(dispatch, credentials) {
        
        instance
            .post("https://todolistdjango.herokuapp.com/signup", { name: credentials.fullName, email: credentials.email, no: credentials.mobileNumber, age: credentials.age, password: credentials.password, bgType: credentials.bloodGroup, rhValue: credentials.rhType, userType: credentials.donor })
            .then(response => response.data)
            .then((body) => {
                console.log("SingUp SuccessFull ", body);
                dispatch(AuthActions.signupupSuccessful());
            })
            .catch(error => {
                var errorCode = error.code;
                //var errorMessage = error.message;
                console.log("signup error ", error);
                dispatch(AuthActions.signupRejected(error));
                alert(error)
            })
        // console.log({name:credentials.fullName,email:credentials.email,no:credentials.mobileNumber,age:credentials.age,password:credentials.password,bgType:credentials.blood,rhValue:credentials.rhType,userType:credentials.userType})
    }

    // Signup Functions Ends



    // Signin Functions Starts
    static signin(credentials) {
        console.log("test ", credentials);
        return (dispatch) => {
            dispatch(AuthActions.signin())
            AuthMiddleware.authenticateUser(dispatch, credentials);
        }
    }

    static authenticateUser(dispatch, credentials) {

        instance
            .post("https://todolistdjango.herokuapp.com/login", { email: credentials.email, password: credentials.password })
            .then(response => response.data)
            .then((body) => {
                dispatch(AuthActions.signinSuccessful(body));
                LocalStorageManager.setUser(body)
            })
            .catch(error => {
                alert(error)
                dispatch(AuthActions.signinRejected(error))
            })

    }

   // *** Signin Functions End ***


    // Logout Functions Starts
    static logout() {
        return (dispatch) => {
            dispatch(AuthActions.logout())
            LocalStorageManager.removeUser();
            dispatch(AuthActions.logoutSuccessful())
        }
    }

    // Logout Functions Ends

    // isLoggedIn 
    static isLoggedIn() {
        return (dispatch) => {
            let user = LocalStorageManager.getUser();
             let token = user.data.token;
            if(user)
            {
            instance.get("getAllUsers",instance.defaults.headers.token=token)
            .then(response=>response.data)
            .then((body)=>{
                console.log(body)
                 dispatch(AuthActions.signinSuccessful(user));
            })
            .catch (error =>{
                console.log("not logged in ");
                // dispatch(AuthActions.signinSuccessful(user))
           
            }
             )
            }
            else{
                console.log("not signned")
            }
        }
    }



}





