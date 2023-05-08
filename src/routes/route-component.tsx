import { Login } from 'pages/login/login';
import { Home } from 'pages/home';
import { About } from 'pages/about';
import { NotFound } from 'pages/not-found';
import { UserList } from 'pages/user-list';
import { RouteName } from './routes';

// NOTE: this object is needed to avoid circular dependencies.
// Without it, importing the AppLink component in a page will create
// a dependency loop.
const RouteComponent = {
  [RouteName.Home]: Home,
  [RouteName.About]: About,
  [RouteName.Login]: Login,
  [RouteName.UserList]: UserList,
  [RouteName.NotFound]: NotFound,
};

export { RouteComponent };
