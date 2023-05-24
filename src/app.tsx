import { AppProvider } from 'context';

import { Router, routes } from 'routes';
import 'index.scss';
import { ErrorBoundary } from 'common/error-boundary';

const App = () => (
  <ErrorBoundary>
    <AppProvider>
      <Router routes={routes} />
    </AppProvider>
  </ErrorBoundary>
);

export { App };
