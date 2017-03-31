import React, { Component, PropTypes } from 'react';
import * as MUI from 'material-ui'
import {Link} from "react-router"
import styles from './RecipentListStyles';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Person from 'material-ui/svg-icons/social/person';

class RecipentList extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor() {
    super();
    this.handleListItemClick = this.handleListItemClick.bind(this);
  }

  handleListItemClick = (id) => this.context.router.push("/dashboard/recipent/" + id);

  listRecipent() {
    console.log("list donors");
    var listItems = this.props.recipentList;
    var items = listItems.map(donars => {
      return donars.data.Recipients.filter((donors => donors.id !== this.props.authUser.data.user.id)).map(listing => {
        console.log("Arsalan sabir ", listing.name)
        return (<div key={listing.id}>
          <MUI.ListItem
            leftAvatar={<MUI.Avatar icon={<Person />} />}
            rightIcon={<ActionInfo />}
            primaryText={listing.name}
            secondaryText={"Blood Group: " + listing.bgType}
            onTouchTap={() => this.handleListItemClick(listing.id)}
          />
          <MUI.Divider />
        </div>)
      })
    })
    return items;
    console.log(this.props.recipentList)
  }

  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.props.getRecipentList(this.props.authUser.data.token);
    }
  }

  render() {
    return (
       this.props.isRecipentError?<div><h1>Your Session Time Out Please Login Again </h1> <Link to="/login" onClick={this.props.logout}>Click Here TO Login </Link> </div>: <div style={styles.donerListContainer}>
        <MUI.List>
          <MUI.Subheader style={styles.subHeader} inset={false}>Recipent List</MUI.Subheader>
          {this.props.isLoading?<MUI.CircularProgress size={80} thickness={5} style={{marginLeft:"50%",marginTop:"40px"}} />:this.listRecipent()
          }
        </MUI.List>
      </div>
    );
  }
}

export default RecipentList
