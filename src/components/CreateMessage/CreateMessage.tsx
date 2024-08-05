import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import IconTemp from '../../utilities/Helpers/iconTemp'
import { discussion, message, vote } from '../../utilities/Constants/iconsList'

type Props = {}

const CreateMessage = (props: Props) => {
    return (
        <Tabs
            defaultActiveKey="message"
            id="controlled-tab"
            className="mb-3"
        >
            <Tab eventKey="message" title={<IconTemp mainClassName='messageTab' {...message} />}></Tab>
            <Tab eventKey="discussion" title={<IconTemp mainClassName='discussionTab' {...discussion} />}></Tab>
            <Tab eventKey="vote" title={<IconTemp mainClassName='voteTab' {...vote} />}></Tab>

        </Tabs>
    )
}

export default CreateMessage
