function Header() {

    return (

        <div className="card">

            <h1 style={{fontSize:"32px"}}>
                API Failure Trends Dashboard
            </h1>

            <p
            style={{
                marginTop:"8px",
                color:"#666"
            }}
            >
                Monitor weekly API failure trends and identify improving or degrading integrations.
            </p>

        </div>

    );

}

export default Header;