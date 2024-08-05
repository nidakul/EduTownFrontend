import React from 'react'
import { Button, Form } from 'react-bootstrap'
import './createDiscussion.css'

type Props = {}

const CreateDiscussion = (props: Props) => {
    return (
        <Form>
            <Form.Group className="interactionTextArea-form mb-3" controlId='interactionTextArea'>
                <Form.Control className='interactionTextArea' as="textarea" placeholder='Hangi konuda fikir almak istersin?' rows={3}></Form.Control>
                <Button className='interaction-btn form-btn-color'>PAYLAŞ</Button>
            </Form.Group>
        </Form>
    )
}

export default CreateDiscussion

