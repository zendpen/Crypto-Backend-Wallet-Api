import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import MainPage from './MainPage';
import HomeTotal from './components/HomeTotal';
import CoinCompHome from './components/CoinCompHome';
import CoinCompSend from './components/CoinCompSend';
import Demo from './components/demo';
import Title from './components/TitleComponent';
import AddressesComponent from './components/AddressesComponent';
import InfiniteScroll from "react-infinite-scroll-component";

class App extends Component {

  state = {
    response: '',
    post: '',
    responseToPost:'',
    totalUSD: '',
    isLoggedIn: false,
    showSplashScreen: false,
    currentPage: "0",
    sendPageVar: "full",
    scrollHasMore: true,
    showReceiveTile: false,
    receiveTileObj: '',
  };
   componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };
  
  handleSubmit = async e => {
    this.setState({showSplashScreen: true})
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    const arr = JSON.parse(body);
    let totalBalUSD = arr.pop();
    console.log("logging", arr[0]);
    console.log("logg test", arr.bchInUSD);
    this.setState({ responseToPost: arr, isLoggedIn: true, showSplashScreen: false , totalUSD: totalBalUSD,});
    console.log("state", this.state.responseToPost[0]);
  };

  handleSendCoin = async (obj) => {
    //e.preventDefault();
    console.log("inside handlecoin", obj);
    const response = await fetch('/api/sendCoin', {
      method: 'POST',
      headers: {
	'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: obj }),
    });
    //const body = await response.text();
    //console.log(body);
  };

setPageChange = newValue => {
  console.log("changed called: ", newValue);
  this.setState({ currentPage: newValue, sendPageVar: "full" , showReceiveTile: false});
}

sendButtonClick = newValue => {
  console.log("sendButonCLick", newValue);
  //this.setState({sendPageVar: newValue});
  this.handleSendCoin(newValue);
}

receiveTileClick = value => {
  console.log("receive tileclick: ", value);
  this.setState({showReceiveTile: true, receiveTileObj: value});
}

receiveBackClick = value => {
  this.setState({showReceiveTile: false });
}

render(){

    if(this.state.currentPage != "0" && !this.state.isLoggedIn){
      if(this.state.showSplashScreen){
      return(
          <div>
            <p>splash screen</p>
          </div>
        );
      }
      return(
	<div>
	  <p>Not logged in. please log in</p>
	  <p>{this.state.response}</p>
          <form onSubmit={this.handleSubmit}>
            <p>
              <strong>Post to Server:</strong>
            </p>
            <input
              type="text"
              value={this.state.post}
              onChange={e => this.setState({ post: e.target.value })}
            />
            <button type="submit">Submit</button>
          </form>
          <p>{this.state.responseToPost}</p>

	  <Demo setChanged={this.setPageChange} />
	</div>
      );
    }

    if(this.state.currentPage === "1"){
      return(
        <div>
	  <Title />
	  <HomeTotal total= {this.state.totalUSD.toFixed(2)} />
	  <div><InfiniteScroll
	    dataLength={this.state.responseToPost.length}
	    next={this.fetchMoreData}
	    hasMore={this.state.scrollHasMore}
	    
	    className={"ScrollStyle"}
	    endMessage={
	      <p style={{ textAlign: "center" }}>
		<b>End List</b>
	      </p>
	    }
	  >
	  {this.state.responseToPost.map((obj, index) => (
	    <CoinCompHome key = {index} coin = {obj.name} balance = {obj.bal} balInUSD = {obj.balInUSD} />
	  ))}
	  </InfiniteScroll>
	  </div>
	  <Demo setChanged={this.setPageChange} />
        </div>
      );
    }
    else if(this.state.currentPage === "0"){
      return(
	<div>
	<Title />
	<InfiniteScroll
            dataLength={this.state.responseToPost.length}
            next={this.fetchMoreData}
            hasMore={this.state.scrollHasMore}
	    
            className={"ScrollStyle"}

            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>End List</b>
              </p>
            }
          >
	  <MainPage />
	</InfiniteScroll>
	  <Demo setChanged={this.setPageChange} />
	</div>
      );
    }
    else if(this.state.currentPage ==="send"){
      return(
	<div>
	  <Title />
	  <p>Coins available to send. </p>
	  <Demo setChanged={this.setPageChange} />
	  <CoinCompSend showPage = {this.state.sendPageVar} list = {this.state.responseToPost} buttonClick = {this.sendButtonClick}/>
	</div>
      );
    }
    else if(this.state.currentPage ==="receive"){
      return(
	<div>
	  <Title />
	  <AddressesComponent list={this.state.responseToPost} backClick = {this.receiveBackClick} tileClick = {this.receiveTileClick} showTile={this.state.showReceiveTile} receiveTileObj={this.state.receiveTileObj} />
	  <Demo setChanged={this.setPageChange} />
	</div>
      );
    }
    else{
      return(
	<div>
	  <p>Nothing rendered</p>
	  <Demo setChanged={this.setPageChange} />
	</div>
      );
    }
  
}//end of render method
}

export default App;
