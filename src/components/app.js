import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Axios from 'axios'

import "../style/main.scss"

// Components components
import NavigationContainer from './navigation/navigationContainer'
import Home from './pages/home'
import About from './pages/about'
import Contact from './pages/contact'
import Blog from './pages/blog'
import PortfolioDetail from './portfolio/portfolio-detail'
import Auth from "./pages/auth"
import NoMatch from './pages/no-match'

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedInStatus: "NOT_LOGGED_IN"
        };

        this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
        this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);

    }

    handleSuccessfulLogin() {
        this.setState({
            loggedInStatus: "LOGGED_IN"
        })
    }

    handleUnsuccessfulLogin() {
        this.setState({
            loggedInStatus: "NOT_LOGGED_IN"
        })
    }

    checkLoginStatus() {
        return Axios.get("https://api.devcamp.space/logged_in", { withCredentials: true
        }).then(response => {
            console.log(response);
            const loggedIn = response.data.logged_in;
            const loggedInStatus = this.state.loggedInStatus;

            if (loggedIn && loggedInStatus === "LOGGED_IN") {
                return loggedIn;
            } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
                this.setState({
                    loggedInStatus: "LOGGED_IN"
                });
            }
        })
        .catch(error => {
            console.log("Error", error)
            })
    }

    componentDidMount() {
        this.checkLoginStatus();
    }

    authoroizedPages() {
        return [
            <Route path='/blog' component={Blog} key="12345" />
        ]
    }

    render() {
        return (
            <div className='container'>
                <Router>
                    <div>
                        < NavigationContainer
                        // loggedInStatus={this.state.loggedInStatus}
                        
                        />

                        <h2>{this.state.loggedInStatus}</h2>

                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route 
                            path="/auth" 
                            render={props => (
                                <Auth 
                                {...props}
                                handleSuccessfulLogin={this.handleSuccessfulLogin}
                                handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                                />
                            )} 
                            
                            
                            />
                            <Route path='/About-me' component={About} />
                            <Route path='/contact-me' component={Contact} />
                            {this.state.loggedInStatus === "LOGGED_IN" ? this.authoroizedPages() : null}
                            <Route exact path='/portfolio/:slug' component={PortfolioDetail} />
                            <Route component={NoMatch} />
                        </Switch>

                    </div>
                </Router>
            </div>
        );
    }
}
