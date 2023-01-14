import React, { useState } from 'react'

//import './App.css'

function ImageUpload() {
  const [imageUp, setImageUp] = useState('')
  const [loadingUp, setLoadingUp] = useState(false)

  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'darwin')
    setLoadingUp(true)
    const res = await fetch(
      '	https://api.cloudinary.com/v1_1/dcvjxvmgo/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()

    setImageUp(file.secure_url)
    setLoadingUp(false)
  }

  return (
    <div className="App">
      <h1>Upload Image</h1>
      <input
        type="file"
        name="file"
        placeholder="Upload an image"
        onChange={uploadImage}
      />
      {loadingUp ? (
        <h3>Loading...</h3>
      ) : (
        <img src={imageUp} style={{ width: '300px' }} />
      )}
    </div>
  )
}

export default ImageUpload;