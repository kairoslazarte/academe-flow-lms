import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import axios from 'axios';

const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
}

const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
]

const CreateNewsUpdates = ({isEdit = false, singleNewsData = null}) => {
    const [content, setContent] = useState("")
    const [uploading, setUploading] = useState(false)
    const [image, setImage] = useState('')

    const onChange = (content, delta, source, editor) => {
      setContent(editor.getHTML());
    };

    const createNewsUpdates = async (e) => {
        e.preventDefault()

        try {
            const { data } = await axios.post('/api/admins/create-news-updates', 
                {
                    image: image,
                    text: content,
                }
            )
            alert("Success!")
        } catch(error) {
            console.log(error)
        }
    }

    const editNewsUpdates = async (e) => {
        e.preventDefault()

        try {
            const { data } = await axios.post('/api/admins/edit-news-updates', 
                {
                    id: singleNewsData?._id,
                    image: !image ? singleNewsData?.image : image,
                    text: !content ? singleNewsData?.text : content,
                }
            )
            alert("Success!")
        } catch(error) {
            console.log(error)
        }
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            }

            const { data } = await axios.post('/api/upload', formData, config)

            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    useEffect(() => {
        if (isEdit) {
            setContent(singleNewsData?.text)
        }
    }, [setContent, singleNewsData, isEdit])

    return (
        <div className={`w-full h-full xl:px-8 px-4 mx-auto ${!isEdit && 'py-20'}`}>
            <div className="my-auto h-full">
                <div className="relative flex flex-row">
                    <h1 className="font-bold text-4xl">
                        {!isEdit ? 'Create' : 'Edit'} News and Updates
                    </h1>
                </div>
                <div className="pt-6">
                    <form className='flex flex-col space-y-6' onSubmit={!isEdit ? createNewsUpdates : editNewsUpdates}>
                        <div className="mr-auto">
                            <label className="inline-block mb-2 font-semibold text-xl">Upload an Image</label>
                            <div className="flex items-center justify-center w-full">
                                    {!image ? (
                                        !isEdit ? (
                                            <label className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300 cursor-pointer">
                                                <div className="flex flex-col items-center justify-center pt-7">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                        Attach photo
                                                    </p>
                                                </div>
                                                <input type="file" onChange={uploadFileHandler} className="opacity-0" />
                                            </label>
                                        ) : (
                                            <label className="flex flex-col w-full h-[300px] border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300 cursor-pointer justify-center">
                                                <div className="flex flex-col items-center justify-center h-full">
                                                    <img 
                                                        className='object-cover h-[200px]'
                                                        src={singleNewsData?.image}
                                                    />
                                                </div>
                                                <input type="file" onChange={uploadFileHandler} className="opacity-0" />
                                            </label>
                                        )
                                    ) : (
                                        <img 
                                            className='object-cover h-[400px]'
                                            src={image}
                                        />
                                    )}
                            </div>
                        </div>

                        <div className='h-[550px]'>
                            <ReactQuill 
                                className="h-[500px]"
                                name="text"
                                modules={modules} 
                                formats={formats} 
                                value={content}
                                theme="snow" 
                                onChange={onChange}
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            className="bg-blue-500 border mx-auto border-blue-500 text-white px-6 py-3 text-lg font-semibold rounded-lg transition duration-200 hover:bg-white hover:text-blue-500"
                        >
                            {!isEdit ? 'Create' : 'Update'} news and updates
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateNewsUpdates;
