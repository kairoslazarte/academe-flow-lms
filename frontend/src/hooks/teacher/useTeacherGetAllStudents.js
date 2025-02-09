import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

const useTeacherGetAllStudents = () => {
    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const getAllStudentsApi = async() => {
            setLoading(true);
            try {
                const { data } = await axios.get('/api/teachers/get-all-students');
                if (data.error) throw new Error(data.error);
                setStudents(data)
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }

        getAllStudentsApi();
    },[])

    return { loading, students }
}

export default useTeacherGetAllStudents;