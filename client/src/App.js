import "./App.css"

function App() {
  return (
    <form
      method="POST"
      action="/upload-multiple-images"
      enctype="multipart/form-data"
    >
      <div>
        <label>Select multiple images:</label>
        <input type="file" name="multiple_images" multiple />
      </div>
      <div>
        <input type="submit" name="btn_upload_multiple_images" value="Upload" />
      </div>
    </form>
  )
}

export default App
