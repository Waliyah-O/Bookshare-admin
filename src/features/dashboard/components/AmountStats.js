import { Link } from "react-router-dom";

function AmountStats({}) {
  return (
    <div className="stats bg-base-100 shadow">
      <div className="stat">
        <div className="stat-title">Due Subscriptions</div>
        <div className="stat-value">$25,600</div>
        <div className="stat-actions">
          <Link to='/app/subscriptions'>
            {" "}
            <button className="btn btn-xs">View Users</button>
          </Link>
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">Cash in hand</div>
        <div className="stat-value">$5,600</div>
        <div className="stat-actions">
          <Link to="/app/transactions">
            {" "}
            <button className="btn btn-xs">View Members</button>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AmountStats;
