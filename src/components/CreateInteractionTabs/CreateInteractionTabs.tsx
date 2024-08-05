import React from 'react'
import { Card, Tab, Tabs } from 'react-bootstrap'
import IconTemp from '../../utilities/Helpers/iconTemp'
import { discussion, message, vote } from '../../utilities/Constants/iconsList'
import CreateMessage from './CreateMessage/CreateMessage'
import CreateDiscussion from './CreateDiscussion/CreateDiscussion'
import CreateVote from './CreateVote/CreateVote'

type Props = {}

const CreateInteractionTabs = (props: Props) => {
    return (
        <Card>
            <Tabs
                defaultActiveKey="message"
                id="controlled-tab"
                className="mb-3"
            >
                <Tab eventKey="message" title={<IconTemp mainClassName='messageTab' {...message} />}><CreateMessage /></Tab>
                <Tab eventKey="discussion" title={<IconTemp mainClassName='discussionTab' {...discussion} />}><CreateDiscussion /></Tab>
                <Tab eventKey="vote" title={<IconTemp mainClassName='voteTab' {...vote} />}><CreateVote /></Tab>

            </Tabs>
        </Card>
    )
}

export default CreateInteractionTabs