//Coin Send Component

import React from 'react';
import './ComponentStyles.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SendTile from './SendTile';
import InfiniteScroll from "react-infinite-scroll-component";
 

class CoinCompSend extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      address: 'a',
      amount: '0.05',
      value: '0.05',
      page: props.showPage,
      qrResult: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddressInputChange = this.handleAddressInputChange.bind(this);
    this.cancelButtonClick = this.cancelButtonClick.bind(this);
    this.continueButtonClick = this.continueButtonClick.bind(this);
    this.confirmButtonClick = this.confirmButtonClick.bind(this);
  }


  doSomething = (obj) => {
    let page = 'btc';
    console.log("function running", obj);
    //this.props.buttonClick(page);
    this.setState({page: "sendPage"});
    console.log("logging:", this.state.page);
  };

  handleInputChange(event){
    this.setState({amount: event.target.value});
  }

  handleAddressInputChange(event){
    this.setState({address: event.target.value});
  }

  cancelButtonClick(){
    this.setState({page: "full" });
  }

  continueButtonClick(){
    console.log("continue click", this.state.address, this.state.amount);
    this.setState({page: "confirm" });
  }

  confirmButtonClick(){
    //console.log("confirm button clicl");
    this.props.buttonClick({address: this.state.address, amount: this.state.amount});
  }

  handleScan = data => {
    if (data) {
      this.setState({
        qrResult: data
      })
    }
  }
  handleError = err => {
    console.error(err)
  }

  render(){

  if(this.state.page === "full"){
    return <div>
	<Button variant="contained" className="ScanButtonClass" color="primary" onClick={() => { this.setState({page: "scanPage"})}}>
          Scan
        </Button>
	<InfiniteScroll
            dataLength={this.props.list.length}
            //next={this.fetchMoreData}
            //hasMore={this.state.scrollHasMore}

            className={"ScrollStyle"}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>End List</b>
              </p>
            }
          >

        {this.props.list.map((obj, index) => (
	  <div >{obj.bal > 0 &&
	  <div>
	  <SendTile tile={obj} clickFunction={this.doSomething} />
	  </div>

	  }

	  </div>
        ))}
	</InfiniteScroll>
      </div>
    ;
  }//end if

  else if(this.state.page === "scanPage"){
    
    return <div>

    </div>
    ;
  }


  else if(this.state.page === "sendPage"){
    return <div>
      <p> Enter Amount: {this.props.showPage}
        <input type="text" value={this.state.amount} onChange={this.handleInputChange}  />
      </p>
      <p>{} BTC</p>
      <p> Enter Recipient Address:
	<input type="text" value={this.state.address} onChange={this.handleAddressInputChange}  />
      </p>
      <Button variant="contained" color="primary" onClick={() => {this.cancelButtonClick()}}>
	CANCEL
      </Button>
      <Button variant="contained" color="primary" onClick={() => {this.continueButtonClick()}}>
	CONTINUE
      </Button>
    </div>
    ;

  }//end else if

  else if(this.state.page === "confirm"){
    return <div>
      <p>Confirm Payment</p>
      <p>Amount: {this.state.amount}</p>
      <p>To address: {this.state.address}</p>
      <Button variant="contained" color="primary" onClick={() => { this.setState({page: "sendPage"})}}>
        BACK
      </Button>
      <Button variant="contained" color="primary" onClick={() => { this.confirmButtonClick() }}>
        Confirm
      </Button>
    </div>
    ;
  }//end else if

  }//end render
}

export default CoinCompSend;
