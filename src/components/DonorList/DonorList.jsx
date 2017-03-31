import React, { Component,PropTypes } from 'react';
import * as MUI from 'material-ui'
import styles from './DonorListStyles';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Colors from 'material-ui/svg-icons/action/invert-colors';
import LocalStorageManager from '../../services/localStorageManager'
import Opacity from 'material-ui/svg-icons/action/opacity';
class DonorList extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(){
    super();
    this.handleListItemClick = this.handleListItemClick.bind(this);
  }
  
  handleListItemClick = (id) => this.context.router.push("/dashboard/donorlist/"+id);

  listDonors(){
    console.log("list donors");
    var listItems = this.props.donorList;
     
   var items = listItems.map(donars =>{
     return donars.data.donars.filter((donors=>donors.id!==this.props.authUser.data.user.id)).map(listing =>{
       console.log("Arsalan sabir " ,listing.name)
       return (<div key={listing.id}>
                <MUI.ListItem                    
                    leftAvatar={<MUI.Avatar icon={<Colors />} />}
                    rightIcon={<Opacity orange800/>}
                    primaryText={listing.name}
                    secondaryText={"Blood Group: "+listing.bgType}
                    onTouchTap={()=>this.handleListItemClick(listing.id)}
                  />
                  <MUI.Divider />
             </div>)
     })
   })
   return items;
  }

  componentWillMount() {
    if(this.props.isAuthenticated){
       this.props.getDonorList(this.props.authUser.data.token)
    }
  }

  render() {
    
    return (
      this.props.isDonorError?<div><h1>Your Session Time Out Please Login Again</h1> </div>:<div style={styles.donerListContainer}>
          <MUI.List>
            <MUI.Subheader style={styles.subHeader} inset={false}>Donor List</MUI.Subheader>
              {this.props.isLoading?<MUI.CircularProgress size={80} thickness={5} style={{marginLeft:"50%",marginTop:"40px"}} />:this.listDonors()}
          </MUI.List>
        </div>
      
    );
  }
}

export default DonorList
