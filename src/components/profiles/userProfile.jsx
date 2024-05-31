import React from "react";

const UserProfile = ({ user }) => {
  return (
    <>
      <div>
        {user ? (
          <div className="card mb-3">
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src={user.banner} alt="Banner" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">Post:{user._count.posts}</p>
                  <p className="card-text">
                    <small className="text-muted">{user.name}</small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">{user.email}</small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      {user._count.followers}
                    </small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      {user._count.following}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default UserProfile;
