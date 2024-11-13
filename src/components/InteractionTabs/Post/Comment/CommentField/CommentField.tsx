import React from 'react'
import CommentPost from '../CommentPost/CommentPost'
import { StudentInformationResponse } from '../../../../../models/responses/studentInformationResponse'
import ListCommentPost from '../ListCommentPost/ListCommentPost'

type Props = {
    userId: string | null,
    user: StudentInformationResponse | null,
    postId: number
}

const CommentField = (props: Props) => {
    return (
        <div>
            <CommentPost userId={props.userId} user={props.user} postId={props.postId} />
            <ListCommentPost userId={props.userId} user={props.user} postId={props.postId} />
        </div>
    )
}

export default CommentField