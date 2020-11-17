import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import AppBar from './AppBar';
import Background from './Background';
import { ItemDetails, ItemsResult } from '../Items';
import './Layout.scss';

const Layout = () => {
  return (
    <Background>
      <AppBar />
      <main id="main-content" className="main-layout" role="main">
        <div className="content-layout">
          <Switch>
            <Route exact path="/items/:id" component={ItemDetails} />
            <Route exact path="/items" component={ItemsResult} />
          </Switch>
        </div>
      </main>
    </Background>
  );
};

export default withRouter(Layout);
