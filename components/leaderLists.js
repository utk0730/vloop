import axios from "axios";
import LeaderBoardCard from "./leaderBoardCard"
const LeaderList = ({ data }) => {
  const handleAddLeader = async () => {
    const _res = await axios.post("http://localhost:5000/add-leader");
  };
  return (
    <div
      style={{
        // width: "600px",
        margin: "100px auto",
        padding: "3rem",
        display: "grid",
        placeItems: "center",
      }}
    >
      <h4 style={{fontSize:'22px'}}>LeaderBoard App</h4>
          <button onClick={handleAddLeader}
              style={{ outline: 'none', border: '1px solid blue', borderRadius: '4px', padding: '0.5rem', background: 'white', margin: '1rem 0rem', fontSize: '16px', color: 'blue' }}>Add Leader</button>
          {data && data.length ?  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{marginRight:'10rem'}}>
              <LeaderBoardCard data={data} />
              </div>
              <div>
              <LeaderBoardCard data={data}/>
             </div>
             
          </div> : <p>No leaders on the board </p>}
         
         
      
    </div>
  );
};
export default LeaderList;
