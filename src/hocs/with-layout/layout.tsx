import React from 'react';
import { Navbar } from 'common/navbar/index';

enum LayoutType {
  // Add more layout types here
  Default = 'Default',
  WithNavbar = 'WithNavbar',
}

type LayoutProps = {
  children: React.ReactNode,
  layoutType: LayoutType,
};

const Layout = ({ layoutType, children }: LayoutProps) => {
  if (layoutType === LayoutType.Default) {
    return (
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <>
        {children}
      </>
    );
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      <Navbar />
      {children}
    </>
  );
};

export { Layout, LayoutType };
