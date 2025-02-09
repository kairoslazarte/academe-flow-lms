import axios from "axios"
import { useState, useEffect } from "react"

const UploadNewslettersMemos = () => {
    const [newslettersMemos, setNewslettersMemos] = useState(null)
    const [file, setFile] = useState('')
    const [uploading, setUploading] = useState(false)
    const [attachLink, setAttachLink] = useState(false)

    const getNewslettersMemos = async() => {
        try {
            const { data } = await axios.get("/api/admins/get-newsletters-memos")
            setNewslettersMemos(data)
        } catch (error) {
            console.log(error)
        }
    }

    const attachFileFcn = async (attachedFile) => {
        try {
            await axios.post('/api/admins/upload-newsletter-memo', {
                file: attachedFile
            })
            getNewslettersMemos()
        } catch (error) {
            console.log(error)
        }
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('file', file)
        setUploading(true)
        setFile(formData)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

            const { data } = await axios.post('/api/newsletterUpload', formData, config)
            
            attachFileFcn(data)
            setFile(data)
            setUploading(false)
            alert('Uploaded file successfully!')
        } catch (error) {
            console.error(error)
            alert("File type not supported! Be sure to only upload PDF|JPG|PNG|JPEG files.")
            setUploading(false)
        }
    }

    const uploadLinkHandler = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/api/admins/upload-newsletter-memo', {
                link: e.target.link.value
            })
            getNewslettersMemos()
            alert("Upload link successfully!")
            setAttachLink(false)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteNewsletterBtnHandler = async (id) => {
        if (window.confirm(`Are you sure you want to delete this Newsletter?`)) {
            await axios.post("/api/admins/delete-newsletters-memos", { 
                newsletterID: id,
            })
            getNewslettersMemos()
        }
    };

    useEffect(() => {
        getNewslettersMemos()
    }, [setNewslettersMemos])

    return (
        <div className="w-full h-full xl:px-8 px-4 mx-auto py-20">
            <div className="my-auto h-full">
                <div className="relative flex flex-row">
                    <h1 className="font-bold text-4xl uppercase">
                        Upload newsletters or memos
                    </h1>
                </div>

                <div className="pt-10 flex flex-col space-y-4">
                    <div className="flex flex-row items-center space-x-4">
                        {!attachLink ? (
                            <>
                                <h2 className="text-gray-800 font-medium">Only pdf, jpg, jpeg, and PNG</h2>
                                <label className="cursor-pointer flex flex-row items-center font-medium text-white bg-gray-800 px-4 py-2 rounded-md shadow-md transition duration-200 hover:scale-105">
                                    Attach a file/image to upload
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6 pl-2 cursor-pointer">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                    </svg>
                                    <input 
                                        type="file"
                                        onChange={uploadFileHandler}
                                        className="opacity-0 cursor-pointer absolute"
                                    />
                                </label>
                                <span>or</span>
                                <button 
                                    className="cursor-pointer flex flex-row items-center font-medium text-white bg-blue-700 px-4 py-2 rounded-md shadow-md transition duration-200 hover:scale-105"
                                    onClick={() => setAttachLink(true)}
                                >
                                    Attach a link
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6 pl-2 cursor-pointer">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                                    </svg>
                                </button>
                            </>
                        ) : (
                            <>
                                <form onSubmit={uploadLinkHandler} className="flex items-center space-x-4">
                                    <input 
                                        type="text"
                                        id="link"
                                        name="link"
                                        placeholder="Attach a link from the internet.."
                                        className="border border-gray-400 italic text-blue-500 text-sm rounded-md px-4 py-2"
                                    />
                                    <button 
                                        type="submit"
                                        className="cursor-pointer flex flex-row items-center font-medium text-white bg-blue-700 px-4 py-2 rounded-md shadow-md transition duration-200 hover:scale-105"
                                    >
                                        Attach a link
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6 pl-2 cursor-pointer">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                                        </svg>
                                    </button>
                                </form>
                                <span>or</span>
                                <button 
                                    type="button"
                                    className="cursor-pointer flex flex-row items-center font-medium text-white bg-gray-800 px-4 py-2 rounded-md shadow-md transition duration-200 hover:scale-105"
                                    onClick={() => setAttachLink(false)}    
                                >
                                    Attach a file/image to upload
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6 pl-2 cursor-pointer">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                    </svg>
                                </button>
                            </>
                        )}
                       
                    </div>
                </div>

                <div className="pt-10">
                    <div className="grid grid-cols-4 gap-6 pt-4">
                        {newslettersMemos?.map((newsletterMemo) => (
                            newsletterMemo?.file ? (
                                <div
                                    key={newsletterMemo?._id}
                                    className="border-2 border-[#e42222] hover:bg-[#e42222] px-4 py-8 shadow-lg rounded-md text-center group hover:scale-105 transition duration-200 group relative"
                                >   
                                    <button
                                        className="text-white bg-red-500 rounded-md p-2 w-auto transition duration-200 hover:opacity-75 absolute top-2 left-2" 
                                        onClick={() => deleteNewsletterBtnHandler(newsletterMemo?._id)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-[1.2rem]">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                    <a 
                                        className="flex flex-col justify-center h-full pt-5"
                                        href={newsletterMemo?.file} 
                                        download
                                    >
                                        <span className="text-[#e42222] group-hover:text-white font-medium break-words">
                                            {newsletterMemo?.file?.replace("/uploads/newsletterUploads/", "")}
                                        </span>
                                        <span className="text-blue-500 text-sm italic group-hover:underline pt-2 group-hover:text-white">Click to download</span>
                                    </a>
                                </div>
                            ) : (
                                <div
                                    key={newsletterMemo?._id}
                                    className="border-2 border-blue-700 hover:bg-blue-700 px-4 py-8 shadow-lg rounded-md text-center group hover:scale-105 transition duration-200 group relative"
                                >   
                                    <button
                                        className="text-white bg-red-500 rounded-md p-2 w-auto transition duration-200 hover:opacity-75 absolute top-2 left-2" 
                                        onClick={() => deleteNewsletterBtnHandler(newsletterMemo?._id)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-[1.2rem]">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                    <a 
                                        className="flex flex-col justify-center h-full pt-5"
                                        href={newsletterMemo?.link} 
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="text-blue-700 group-hover:text-white font-medium break-words">
                                            {newsletterMemo?.link}
                                        </span>
                                        <span className="text-blue-500 text-sm italic group-hover:underline pt-2 group-hover:text-white">Click to open in new tab</span>
                                    </a>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadNewslettersMemos