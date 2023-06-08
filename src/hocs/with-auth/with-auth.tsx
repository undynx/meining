import React from 'react';
import { Auth } from './auth';

const withAuth = <TOriginalProps extends {}>(Component: React.ComponentType<TOriginalProps>) => (
  (props: TOriginalProps) => (
    <Auth>
      <Component {...props} />
    </Auth>
  )
);

export { withAuth };
