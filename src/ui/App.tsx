import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/layout/header/Header';
import Home from './components/pages/home/Home';
import BookTicket from './components/pages/bookTicket/BookTicket';
import Ticket from './components/pages/ticket/Ticket';
import Register from './components/auth/register/Register';
import Login from './components/auth/login/Login';
import Alerts from './components/layout/alert/Alerts';
import SetAuthToken from './utils/SetAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

import AuthState from './context/auth/authState';
import AlertState from './context/alert/alertState';
import MovieState from './context/movie/movieState';
import TicketState from './context/ticket/TicketState';

import './App.scss';

if (localStorage.token) {
    SetAuthToken(localStorage.token);
}

const App = () => {
    return (
        <AuthState>
            <AlertState>
                <MovieState>
                    <TicketState>
                        <Router>
                            <React.Fragment>
                                <Header />
                                {/* // <div className="container"> */}
                                <Alerts />
                                <Switch>
                                    <PrivateRoute exact path="/" component={Home} />
                                    <PrivateRoute exact path="/book-ticket" component={BookTicket} />
                                    <PrivateRoute exact path="/tickets" component={Ticket} />
                                    <Route exact path="/register" component={Register} />
                                    <Route exact path="/login" component={Login} />
                                    <Route render={() => <h2>Page not found</h2>} />
                                </Switch>
                                {/* </div> */}
                            </React.Fragment>
                        </Router>
                    </TicketState>
                </MovieState>
            </AlertState>
        </AuthState>
    );
};

export default App;
