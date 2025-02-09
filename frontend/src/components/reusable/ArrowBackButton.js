import { useContext } from "react";
import { ArrowCircleLeftIcon } from "@heroicons/react/outline";
import { StudentSidebarContexts } from "../../contexts/student/StudentSidebarContexts";
import { TeacherSidebarContexts } from "../../contexts/teacher/TeacherSidebarContext";
import useConversation from "../../zustand/useConversation";

const ArrowBackButton = ({component}) => {
    const { setActiveComponent } = useContext(component === "teacher" ? TeacherSidebarContexts : StudentSidebarContexts);
    const { selectedConversation, setSelectedConversation } = useConversation()

    const handleArrowBackClickFn = () => {
        setActiveComponent("Home");
        setSelectedConversation(null);
    }

    return (
        <div>
            <button
                className="bg-[#58c150] p-2 text-white rounded-md hover:opacity-70 transition duration-200 ml-auto text-sm"
                onClick={handleArrowBackClickFn}
            >
                <ArrowCircleLeftIcon className='w-auto h-6 text-white ml-auto' />
            </button>
        </div>
    )
}

export default ArrowBackButton;