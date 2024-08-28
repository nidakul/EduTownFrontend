// import React from 'react'
// import { Card, Table } from 'react-bootstrap'

// type Props = {}

// const GradeTypeTable = (props: Props) => {
//     return (
//         <Card className="grades-card">
//             <Table striped bordered hover>
//                 <thead className="grades">
//                     <tr>
//                         {gradeType.map((type, typeIndex) => (
//                             <th
//                                 key={typeIndex}
//                                 colSpan={type.gradeCount}
//                                 className={typeIndex === 0 ? "lesson-name" : ""}
//                             >
//                                 {type.name}
//                             </th>
//                         ))}
//                     </tr>
//                     <tr>
//                         {/* number of colspan */}
//                         {gradeType.map((type, typeIndex) => (
//                             type.gradeCount > 0 ?
//                                 Array.from({ length: type.gradeCount }).map((_, countIndex) => (
//                                     <th key={`${typeIndex}-${countIndex}`}>
//                                         {countIndex + 1}
//                                     </th> 
//                                 ))
//                                 : (<th key={`${typeIndex}-empty`}></th>
//                                 )
//                         ))}
//                     </tr>
//                 </thead>
//                 {/* <tbody>
//             {lessons && lessons.lessonName && lessons.lessonName.map((lessonName: string, index: number) => (
//               <tr key={index}>
//                 <td>{lessonName}</td>

//               </tr>
//             ))}
//           </tbody> */}
//             </Table>
//         </Card>
//     )

// }

// export default GradeTypeTable