import React from 'react'
import { Button, Form } from 'react-bootstrap'
import './createMessage.css'

const CreateMessage = () => {
    return (
        <Form>
            <Form.Group className="messageTextArea-form mb-3" controlId='messageTextArea'>
                <Form.Control className='messageTextArea' as="textarea" placeholder='Ne paylaşmak istersin?' rows={3}></Form.Control>
                <Button className='createMessage-btn form-btn-color'>PAYLAŞ</Button>
            </Form.Group>
        </Form>
    )
}

export default CreateMessage
