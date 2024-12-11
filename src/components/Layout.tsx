import Banner from './Banner';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Banner />
      {children}
    </>
  );
};

export default Layout;
