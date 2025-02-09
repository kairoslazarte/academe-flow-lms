import axios from "axios"
import { useState, useEffect } from "react"
import { Helmet } from "react-helmet";
import Loader from "./Loader";

const ViewNewsAndUpdates = () => {
    const [newsUpdates, setNewsUpdates] = useState(null)

    const getNewsAndUpdates = async () => {
        try {
            const { data } = await axios.get('/api/admins/get-news-updates')
            setNewsUpdates(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getNewsAndUpdates()
    }, [setNewsUpdates])

    return (
        newsUpdates ? (
            <div>
                <div className="rounded-lg border-dashed border-2 border-orange-600 bg-blue-50 animate-bounce w-full py-7">
                    <h1 className="text-center font-bold text-xl sm:text-3xl lg:text-4xl xl:text-5xl uppercase w-full">
                        <span className="text-green-700">N</span>
                        <span className="text-red-700">E</span>
                        <span className="text-blue-700">W</span>
                        <span className="text-yellow-700">S</span>
                        <span> </span>
                        <span className="text-pink-700">&</span>
                        <span> </span>
                        <span className="text-orange-700">A</span>
                        <span className="text-gray-700">N</span>
                        <span className="text-green-700">N</span>
                        <span className="text-blue-700">O</span>
                        <span className="text-gray-700">U</span>
                        <span className="text-red-700">N</span>
                        <span className="text-pink-700">C</span>
                        <span className="text-yellow-700">E</span>
                        <span className="text-blue-700">M</span>
                        <span className="text-pink-700">E</span>
                        <span className="text-green-700">N</span>
                        <span className="text-red-700">T</span>
                        <span className="text-gray-700">S</span>
                    </h1>
                </div>
            
                <div className="my-auto h-full py-10 flex flex-col space-y-8">
                    {newsUpdates?.map((newsUpdate) => (
                        <div key={newsUpdate?._id} className="flex flex-col px-4 xl:px-8 py-6 xl:py-10 bg-white shadow-lg rounded-xl">
                            {newsUpdate?.image && (
                                <div className="md:h-[600px] bg-orange-50 rounded-md">
                                    <img 
                                        className='object-contain md:object-cover md:h-full mx-auto'
                                        src={newsUpdate?.image}
                                    />
                                </div>
                            )}
                            {/* <div className="pt-5">
                                <h5 className="italic text-gray-700 text-center">
                                {new Date(newsUpdate?.createdAt).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})}
                                </h5>
                            </div> */}
                            <Helmet>
                                <style type="text/css">
                                    {`
                                        p:first-child {
                                            text-align: center;
                                            font-size: 1.875rem;
                                            line-height: 2.25rem;
                                        }

                                    `}
                                </style>
                            </Helmet>
                            {newsUpdate?.text && (
                                <div id="news-updates-content" className={`text-xl break-words ${newsUpdate?.image && 'pt-8'}`} dangerouslySetInnerHTML={{ __html: newsUpdate?.text }} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        ) : (
           <Loader />
        )
        
    )
}

export default ViewNewsAndUpdates