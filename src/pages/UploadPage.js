import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Button, FormText, Input } from 'reactstrap'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'

const UploadPage = () => {
    const [previewImage, setPreviewImage] = useState(null)
    const [message, setMessage] = useState('')
    const [imageFile, setImageFile] = useState(null)
    const [isUploaded, setIsUploaded] = useState(null)


    const handleFile = (e) => {
        if (e.target.files.length > 0) {
            setImageFile(e.target.files[0])
            setPreviewImage(URL.createObjectURL(e.target.files[0]))
        }
    }

    const imgUpload = (e) => {
        e.preventDefault()
        const jwt = localStorage.getItem("jwt")
        let formData = new FormData();
        formData.append('image', imageFile);
        console.log(formData)
        axios.post('https://insta.nextacademy.com/api/v1/images/', formData, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
            .then(result => {
                console.log(result + 'imgupload')
                setImageFile(null)
                setPreviewImage(null)
                setIsUploaded(true)
            })
            .catch(error => {
                console.log(error + 'imguperr');
                setIsUploaded(false)
            })
    }
    useEffect(() => {
        if (isUploaded) {
            toast('🦄 Image uploaded!', {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
        else if (isUploaded === false) {
            toast.error('Did not upload! Try again or contact us.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
        else {
            return;
        }
        setIsUploaded(null)
    }, [isUploaded])


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover
            />
            <div className="p-3">
                <h2>
                    Share your images with the world!
                </h2>
                <br />
                <Form id='uploadForm' onSubmit={imgUpload}>
                    <FormGroup>
                        <label for='fileInput'>Choose a file</label>
                        <Input id='fileInput'
                            multiple={false}
                            type="file"
                            name="image-file"
                            onChange={handleFile}
                        />
                        <FormText color="muted">
                            Make sure the image being uploaded is a supported format.
                    </FormText>
                    </FormGroup>
                    <div id='previewCard'>
                        {previewImage !== null ? (
                            <img
                                src={previewImage}
                                width="300px"
                            />
                        ) :
                            <h3>
                                {message ? message : "Image Preview"}
                            </h3>
                        }
                    </div>

                    <Button type="submit" color="primary">
                        Upload
                </Button>
                </Form>

            </div>
        </>
    )
}

export default UploadPage;