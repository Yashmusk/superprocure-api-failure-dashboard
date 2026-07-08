function Legend(){

    return(

        <div
        className="card"
        style={{
            display:"flex",
            gap:"30px"
        }}
        >

            <span>🟢 Better</span>

            <span>🔴 Worse</span>

            <span>🟡 Same</span>

            <span>⚪ Neutral</span>

        </div>

    );

}

export default Legend;