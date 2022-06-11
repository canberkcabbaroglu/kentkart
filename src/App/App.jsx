import React from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from '@/helpers';
import { authenticationService } from '@/services';
import { HomePage, PrivateRoute, LoginPage } from '@/pages';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: null
        };
    }

    componentDidMount() {
        authenticationService.userName.subscribe(x => this.setState({ userName: x }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { userName } = this.state;
        return (
            <Router history={history}>
                <div>
                    {userName &&
                        <nav className="navbar navbar-expand navbar-light bg-primary">
                            <div className="navbar-nav">

                                <a onClick={this.logout} className="nav-item nav-link">Çıkış Yap</a>
                            </div>
                        </nav>
                    }
                    <div>

                        <PrivateRoute exact path="/" component={HomePage} />
                        <Route path="/login" component={LoginPage} />

                    </div>
                </div>
            </Router>
        );
    }
}

export { App }; 