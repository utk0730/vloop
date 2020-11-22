import axios from "axios"
const LeaderBoardCard = ({ data }) => {
    const updateLeaderScore = async (id, value) => {
        const _user = data.filter((_t) => _t._id == id)[0];
        const _res = await axios.patch(
          "http://localhost:5000/update-leader-point",
          { id, point: _user.point + value }
        );
      };
    return <div
    style={{
      border: "1px solid gray",
      padding: "1rem",
    }}
  >
    {data.length && (
      data.map((_d) => {
        const { _id, name, point } = _d;
        return (
          <div
            key={_id}
            style={{
              border: "1px solid gray",
                padding: "0.25rem 0.5rem",
                borderRadius: '4px',
              marginBottom:'1rem'
            }}
          >
            <div
              style={{
                display: "flex",
                textAlign: "center",
              }}
            >
              <p >{name}</p>

                    <p style={{
                        color: 'blue',
                        fontWeight: '600',
                        margin: 'auto 4rem',
                        fontSize:'20px'
                    }}>{point}</p>
              <button
                style={{ margin: "1rem" }}
                onClick={() => updateLeaderScore(_id, 1)}
              >
                +
              </button>
              <button
                style={{ margin: "1rem" }}
                onClick={() => updateLeaderScore(_id, -1)}
              >
                -
              </button>
            </div>
          </div>
        );
      })
    )}
  </div>
}
export default LeaderBoardCard