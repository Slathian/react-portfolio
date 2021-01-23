import React, { Component } from 'react';

import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
    constructor() {
        super();
        
        this.state = {
            pageTitle: "Welcome to my Portfolio",
            isLoading: false,
            data: [
                {title: "Quip", catagory: "eCommerce"},
                {title: "Eventbrite", catagory: "eCommerce"}, 
                {title: "Ministry Safe", catagory: "Scheduling"},
                {title: "Toothpaste Co", catagory: "Fake Listed"},
                {title: "Darza's", catagory: "Game Studio"}
            ]
        };

        this.handleFilter = this.handleFilter.bind(this);

    }

    handleFilter(filter) {
        this.setState({
            data: this.state.data.filter(item => {
                return item.catagory === filter;
            })
        })
    }

    portfolioItems() {
        return this.state.data.map(item => {
            return <PortfolioItem title={item.title} />;
        });
    };


    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>
        }
        return (
          <div>
            <h2>{this.state.pageTitle}</h2>
    
            <button onClick={() => this.handleFilter("eCommerce")}>
              eCommerce
            </button>
            <button onClick={() => this.handleFilter("Scheduling")}>
              Scheduling
            </button>
            <button onClick={() => this.handleFilter("Fake Listed")}>
              Fake Listed
            </button>
            <button onClick={() => this.handleFilter("Game Studio")}>
              Game Studio
            </button>
    
            {this.portfolioItems()}
          </div>
        );
      }
}