export const Teams = ({data, handleFetchAll}) => {
    let errMsg = "No Data to show";
    if(typeof(data) === 'string') {
        errMsg = data;
    }
    return typeof(data) === 'object' && data.length > 0 ?
        <div>
          <div className="container" style={{ color: "white" }}>
            <table>
              <tbody>
                <tr>
                  <th> Id </th>
                  <th> Team Name </th>
                  <th> Team Role </th>
                </tr>
                {data.map((d) => (
                  <tr key={d.rowId}>
                    <td>{d.rowId}</td>
                    <td>{d.teamName}</td>
                    <td>{d.teamRole}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        :
        <div className="container" style={{ color: "white" }}>
            <h2> {errMsg} </h2>
        </div>
}