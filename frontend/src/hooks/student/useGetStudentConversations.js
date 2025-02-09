import { useEffect, useState } from "react"
import axios from "axios";

const useGetStudentConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversationsApi = async() => {
            setLoading(true);
            try {
                const { data } = await axios.get('/api/students/conversations');
                if (data.error) {
                    throw new Error(data.error);
                }
                setConversations(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        getConversationsApi();
    }, []);

    return { loading, conversations, setConversations }
}

export default useGetStudentConversations;