import logo from '../art/sunnysidelogo.PNG';

const PageNotFound = () => {
  return (
    <div
        className="App"
        style={{ 
            padding:"10px", 
            textAlign: "center", 
            backgroundColor: "#A3D4F7",
            height: "100vh"
        }}
    >
        <h1
            style={{
                padding: "0px",
                margin: "0px"
            }}>
            Oops! Page cannot be found! Are you sure it's the correct link?
        </h1>
        
        {/* Image container with position relative */}
        <div style={{ position: "relative" }}>
            <img
                src={logo}
                alt="404"
                style={{
                width: "80%"
                }}
            />
        </div>
    </div>
  );
};

export default PageNotFound;