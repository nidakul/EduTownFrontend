import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllStudents } from '../../../store/student/studentSlice';
import { AppDispatch, RootState } from '../../../store/configureStore';

type Props = {}

const ListStudent = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const students = useSelector((state: RootState) => state.student.items);
    console.log("student", students);

    useEffect(() => {
        dispatch(getAllStudents());
    }, [dispatch])
    return (
        <div>
            {students.map(student => (
                student.firstName
            ))}
        </div>
    )
}

export default ListStudent 