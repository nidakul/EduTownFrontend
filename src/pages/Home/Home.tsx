import Login from "../Login/Login";

const Home = () => {
  return (
    <>
      {/* <Navigation />
      <div className="d-flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<UserInformation />} />
          <Route path="/grades" element={<Grades />} />
        </Routes>
      </div> */}
      <Login></Login>
    </>
  );
};

export default Home;
