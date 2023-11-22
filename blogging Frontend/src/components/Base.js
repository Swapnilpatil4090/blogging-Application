import CustomNavbar from "./CustomNavbar";

const Base = ({ children }) => {
  return (
    <div className="container-fluid p-0 m-0 color-change-2x">
      <CustomNavbar />
      {children}
    </div>
  );
};

export default Base;
