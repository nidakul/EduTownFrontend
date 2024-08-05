import React from 'react'
import { Button, Form } from 'react-bootstrap'
import './createMessage.css'

const CreateMessage = () => {
    return (
        <Form>
            <Form.Group className="interactionTextArea-form mb-3" controlId='interactionTextArea'>
                <Form.Control className='interactionTextArea' as="textarea" placeholder='Ne paylaşmak istersin?' rows={3}></Form.Control>
                <Button className='interaction-btn form-btn-color'>PAYLAŞ</Button>
            </Form.Group>
        </Form>
    )
}

export default CreateMessage
