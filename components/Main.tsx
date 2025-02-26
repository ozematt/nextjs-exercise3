const Main = (props: any) => {
  const { children } = props;
  return <main className="flex-1 flex flex-col">{children}</main>;
};

export default Main;
