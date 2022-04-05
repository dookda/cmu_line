import Nav from "../Nav/Nav";
import './Profile.css';

const Profile = () => {
  return (
    <>
      <Nav />
      <div className="container mt-80">
        <div className="card-body text-center">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar" className="rounded-circle img-fluid" />
          <h5 className="my-3">John Smith</h5>
          <p className="text-muted mb-1">Full Stack Developer</p>
          <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
          {/* <div className="d-flex justify-content-center mb-2">
            <button type="button" className="btn btn-primary">Follow</button>
            <button type="button" className="btn btn-outline-primary ms-1">Message</button>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Profile;