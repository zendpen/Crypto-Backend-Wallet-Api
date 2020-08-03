import React, {Component} from 'react';
import App from './App';
import Button from '@material-ui/core/Button';
import './MainPage.css';
import Article from './blogcomponents/Article';
import Title from './components/TitleComponent';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

class MainPage extends Component {
  state = {
    currentPage: 0,
    article: "",
  };

  render(){

    if(this.state.currentPage === 0){
      return(
	<div>
          <div className="center">
          <h1>Welcome to CoinPurse! </h1>
          <h2>This site is dedicated to the education of cryptocurreny and provides an easy to use wallet to users. 
		You must create a free account to use the wallet.</h2>
	  </div>
	  <h1>Welcome to the blog</h1>
	  <h3>Click on a category</h3>
	  <Button className="buttonClass" variant="contained" color="primary" onClick={() => {this.setState({currentPage: 1})}} >
	  Beginner's Guide to Crypto
	  </Button>
	</div>
      );
    }

    else if(this.state.currentPage === 1){
      return (
	<div>
	  <Title />
	  <IconButton aria-label="delete" color="primary" variant="contained" component="span" 
	    onClick={() => {this.setState({currentPage: this.state.currentPage - 1})}}>
  	    <ArrowBackIcon />
	  </IconButton>
	  <h1>Beginner's Guide to Crypto</h1>
	  <h3>Choose an article</h3>
	  <Button className="buttonClass" variant="contained" color="primary" onClick={() => {this.setState({ currentPage: 2, article: "article1-1"})}} >
	    What is Cryptocurrency?
	  </Button>
	  <div className="spaceDiv"></div>
	  <Button className="buttonClass" variant="contained" color="primary" >
	    How to get Cryptocurrency?
	  </Button>
	</div>
      );
    }
    else if(this.state.currentPage === 2){
      return (
	<div>
	  <Title />
	  <IconButton aria-label="delete" color="primary" variant="contained" component="span" 
            onClick={() => {this.setState({currentPage: this.state.currentPage - 1})}}>
            <ArrowBackIcon />
          </IconButton>
	  <Article article={this.state.article} />
	</div>
      );
    }
  }
}

export default MainPage;
