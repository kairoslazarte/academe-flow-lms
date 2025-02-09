import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

const useStudentGetAllTeachers = () => {
    const [loading, setLoading] = useState(false);
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const getAllTeachersApi = async() => {
            setLoading(true);
            try {
                const { data } = await axios.get('/api/students/get-all-teachers');
                if (data.error) throw new Error(data.error);
                setTeachers(data)
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }

        getAllTeachersApi();
    },[])

    return { loading, teachers }
}

export default useStudentGetAllTeachers;