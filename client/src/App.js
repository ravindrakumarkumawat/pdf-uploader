import "./App.css";

function App() {
  return (
    <form
      method="POST"
      action="http://localhost:5000/upload-profile-pic"
      encType="multipart/form-data"
    >
      <div>
        <label>Select your profile picture:</label>
        <input type="file" name="profile_pic" />
      </div>
      <div>
        <input type="submit" name="btn_upload_profile_pic" value="Upload" />
      </div>
    </form>
  )
}

export default App;
