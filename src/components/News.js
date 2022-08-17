import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
    constructor(){
        super();
        this.state ={
            articles: [],
            loading: false,
            page : 1
        }
    }
    
    //lifecycle method
    //jab render run ho jata hai uske baad run hota hai ye 
    async componentDidMount(){
      let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=df3e680887ff4ebb84da7a808f05608c&page=1&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json()

      this.setState({articles: parsedData.articles,totalResults: parsedData.totalResults})
    }
 
    handleNextClick= async ()=>{
      console.log("next");
      if ( this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

      }
      else{
        let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=df3e680887ff4ebb84da7a808f05608c&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`; //going to next state
      let data = await fetch(url);
      let parsedData = await data.json()

      this.setState({
        page: this.state.page +1,
        articles: parsedData.articles
      })
      }
      
    }

    handlePrevClick= async ()=>{
     console.log('prev');

      let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=df3e680887ff4ebb84da7a808f05608c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`; //going to prev state
      let data = await fetch(url);
      let parsedData = await data.json()

      this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles
      })
    }

    render() {
        return (
            <div className="container my-3 ">
                <h1 className="text-center">Top Headlines</h1>
                <div className="row my-5">
                   {this.state.articles.map( (element)=> {
                      return <div className="col-md-4" key={element.url}>
                     <NewsItem  title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} />
                  </div>
                    })}  
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        );
    }
}

export default News;
