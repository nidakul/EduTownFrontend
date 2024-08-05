import React from 'react'
import { Button, Form } from 'react-bootstrap'

type Props = {}

const CreateDiscussion = (props: Props) => {
    return (
        <Form>
            <Form.Group className="messageTextArea-form mb-3" controlId='messageTextArea'>
                <Form.Control className='messageTextArea' as="textarea" placeholder='Hangi konuda fikir almak istersin?' rows={3}></Form.Control>
                <Button className='createMessage-btn form-btn-color'>PAYLAŞ</Button>
            </Form.Group>
        </Form>
    )
}

export default CreateDiscussion