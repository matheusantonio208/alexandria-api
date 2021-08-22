import { Router } from 'express';

import isAuth from '#middlewares/auth-middle.js';

import Session from '#controllers/User/session-controller.js';
import User from '#controllers/User/user-controller-root.js';

class Routes {
  constructor() {
    this.route = new Router();

    this.user('/user');
    this.session('/session');

    this.exampleRoute('/');
  }

  exampleRoute(baseRoute) {
    this.route.get(`${baseRoute}`, (req, res) => {
      return res.status(200).json({
        success_msg: 'Welcome to Atlantjs. Onde sua criatividade vira realidade.',
      });
    });

    this.route.post(`${baseRoute}/db`, (req, res) => {
      return res.status(201).json({ success_msg: 'Already!' });
    });
  }

  user(baseRoute) {
    this.route.post(`${baseRoute}/registration`, User.store);
    this.route.get(`${baseRoute}/:userId`, isAuth, User.show);
    this.route.put(`${baseRoute}/:userId`, isAuth, User.update);
    this.route.delete(`${baseRoute}/:userId`, isAuth, User.delete);
  }

  session(baseRoute) {
    this.route.post(`${baseRoute}/login`, Session.store);
  }
}

export default new Routes().route;
