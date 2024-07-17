import React from 'react';
import { Table } from 'react-bootstrap';
import { GetListGradeTypeResponse } from '../../models/responses/getListGradeTypeResponse';

type Props = {
    gradeType?: GetListGradeTypeResponse[];

}

const AddStudentGrade = (props: Props) => {
    const { gradeType } = props;
    console.log("gradeType", gradeType);

    return (
        <>
            {gradeType && gradeType.map((type) => (
                <th
                    key={type.id}
                    colSpan={type.gradeCount}
                >
                    {type.name}
                </th>
            ))}
            <tr>
                {/* number of colspan */}
                {gradeType && gradeType.map((type, typeIndex) => (
                    type.gradeCount > 0 ?
                        Array.from({ length: type.gradeCount }).map((_, countIndex) => (
                            <th key={`${typeIndex}-${countIndex}`}>
                                {countIndex + 1}
                            </th>
                        ))
                        : (<th key={`${typeIndex}-empty`}></th>
                        )
                ))}
            </tr>
        </>
    );
}

export default AddStudentGrade;
