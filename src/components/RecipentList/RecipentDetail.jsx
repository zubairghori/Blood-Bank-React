import React, { Component } from 'react';
import * as MUI from 'material-ui'
import styles from './RecipentListStyles';
import Person from 'material-ui/svg-icons/social/person';


//<div>Age : 45</div>
class RecipentDetail extends Component {


 componentWillMount() {
  this.props.recipentList.map((data)=>{
     return data.data.Recipients.map((recipents=>{
     if(recipents.id == this.props.params.id)
     {
      this.props.getRecipentDetail(recipents)
     }
    }))
  })
  }

  //user-default
  render() {
      
    const {RecipentDetail} = this.props;
    console.log(RecipentDetail)
    return (
      <div style={styles.donerDetailContainer}>
        <MUI.Card>
          <MUI.CardHeader
            title={<span style={{fontWeight:"bold"}}>{RecipentDetail.name} </span>}
            subtitle={RecipentDetail.bgType}
            avatar={<MUI.Avatar icon={<Person />}/>}
          />
          <MUI.CardText >
            <div><span style={{fontWeight:"bold"}}>Contatct No. : </span> {RecipentDetail.no}</div>
            <div><span style={{fontWeight:"bold"}}>Email. : </span>{RecipentDetail.email}</div>
            <div><span style={{fontWeight:"bold"}}>Age : </span> {RecipentDetail.age}</div>
          </MUI.CardText>
        </MUI.Card>
      </div>
    );
  }
}

export default RecipentDetail
