import React, { Component } from 'react';
import * as MUI from 'material-ui'
import styles from './DonorDetailStyles';
import Person from 'material-ui/svg-icons/social/person';


//<div>Age : 45</div>
class DonorDetail extends Component {


  componentWillMount() {
  this.props.donorList.map((data)=>{
     return data.data.donars.map((donors=>{
     if(donors.id == this.props.params.id)
     {
      this.props.getDonorDetail(donors)
     }
    }))
  })
  
  }

  //user-default
  render() {
      
    const {donorDetail} = this.props;
    console.log(donorDetail)
    return (
      <div style={styles.donerDetailContainer}>
        <MUI.Card>
          <MUI.CardHeader
            title={<span style={{fontWeight:"bold"}}>{donorDetail.name} </span>}
            subtitle={donorDetail.bgType}
            avatar={<MUI.Avatar icon={<Person />}/>}
          />
          <MUI.CardText >
            <div><span style={{fontWeight:"bold"}}>Contatct No. : </span> {donorDetail.no}</div>
            <div><span style={{fontWeight:"bold"}}>Email. : </span>{donorDetail.email}</div>
            <div><span style={{fontWeight:"bold"}}>Age : </span> {donorDetail.age}</div>
          </MUI.CardText>
        </MUI.Card>
      </div>
    );
  }
}

export default DonorDetail
