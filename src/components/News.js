import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
    constructor(){
        super();
        this.state ={
            articles: [],
            loading: false
        }
    }
    
    //lifecycle method
    //jab render run ho jata hai uske baad run hota hai ye 
    async componentDidMount(){
      let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=df3e680887ff4ebb84da7a808f05608c"
      let data = await fetch(url);
      let parsedData = await data.json()

      this.setState({articles: parsedData.articles})
    }
    render() {
        return (
            <div className="container my-3 ">
                <h1 className="text-center">Top Headlines</h1>
                <div className="row my-5">
                   {this.state.articles.map( (element)=> {
                      return <div className="col-md-4" key={element.url}>
                     <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imgUrl={element.urlToImage} newsUrl={element.url} />
                  </div>
                    })}  
                </div>
            </div>
        );
    }
}

export default News;
