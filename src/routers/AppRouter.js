import React, {lazy, Suspense} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Loader from '../components/common/Loader';
import {extractSearchParams} from "../utils/Utils";
import EventRegister from "../components/Pages/Events/EventRegister";
import Slider from "../components/Pages/Sessions/Sessions";
const Home = lazy(() => import('../components/Pages/Home/Home'));
const Past = lazy(() => import("../components/Pages/Past/Past"));
const Events = lazy(() => import('../components/Pages/Events/Events'));
const LoginPage = lazy(() => import('../components/Pages/Auth/LoginPage'));
const RegisterPage = lazy(() => import('../components/Pages/Auth/RegisterPage'));
const MegaShows = lazy(() => import('../components/Pages/MegaShows/MegaShows'));
const ExtraDetails = lazy(() => import("../components/accounts/ExtraDetails"));
const NotFound = lazy(() => import("../components/common/NotFound"));
const Team = lazy(() => import('../components/Pages/Team/Team'));
const Accommodation = lazy(() => import('../components/Pages/Accomodation/Accommodation'));


const AppRouter = ({location}) => {
    return (
        <div className="Base-page__wrapper">
            <Suspense fallback={<Loader/>}>
                <Switch location={location}>
                    <Route exact path={"/"} render={props => <Home {...props} {...extractSearchParams(props)} />}/>
                    <Route exact path={"/accommodation"}
                           render={props => <Accommodation {...props} {...extractSearchParams(props)}/>}/>
                    <Route exact path={"/megashows"}
                           render={props => <MegaShows {...props} {...extractSearchParams(props)}/>}/>
                    <Route exact path={"/events"}
                           render={props => <Events {...props} {...extractSearchParams(props)} />}/>
                    <Route exact path={"/login"}
                           render={props => <LoginPage {...props} {...extractSearchParams(props)}/>}/>
                    <Route exact path={"/register"}
                           render={props => <RegisterPage {...props} {...extractSearchParams(props)}/>}/>
                    <Route exact path={"/teamRegister/:eventName/:eventID/:minTeam/:maxTeam"}
                           render={props => <EventRegister {...props} {...extractSearchParams(props)}/>}/>
                    <Route exact path={"/team"} render={props => <Team {...props} {...extractSearchParams(props)}/>}/>
                    <Route exact path={"/past"} render={props => <Past {...props} {...extractSearchParams(props)}/>}/>
                    <Route exact path={"/update"}
                           render={props => <ExtraDetails {...props} {...extractSearchParams(props)}/>}/>
                    <Route exact path={"/sessions"}
                           render={props => <Slider {...props} {...extractSearchParams(props)}/>}/>
                    <Route render={props => <NotFound {...props} {...extractSearchParams(props)}/>}/>

                </Switch>
            </Suspense>
        </div>

    );
};

export default withRouter(AppRouter);