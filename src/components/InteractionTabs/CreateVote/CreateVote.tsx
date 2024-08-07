import React from 'react'
import { Button, Form } from 'react-bootstrap'
import "./createVote.css"

type Props = {}

const CreateVote = (props: Props) => {
    return (
        <div>
            <Form>
                <Form.Group className="interactionTextArea-form mb-2" controlId='interactionTextArea'>
                    <Form.Control className='interactionTextArea' as="textarea" placeholder='Soru sor...' rows={2}></Form.Control>
                    <input className='vote-input' type='text' placeholder='Seçenek 1' />
                    <input className='vote-input' type='text' placeholder='Seçenek 2' />
                    <div className='vote-date'>
                        <span>Bitiş Tarihi: </span>
                        <input
                            type="date"
                            name="date"
                            id='vote-date'
                            className='input-vote-date'
                        // value={formData.birthdate.toISOString().split('T')[0]}
                        // onChange={handleChange}
                        ></input>
                    </div>

                    <Button className='interaction-btn form-btn-color'>PAYLAŞ</Button>
                </Form.Group>

            </Form>
        </div>
    )
}

export default CreateVote