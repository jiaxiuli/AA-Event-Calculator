/*
 * @Author: Leo
 * @Date: 2023-07-04 12:47:59
 * @LastEditors: Leo
 * @LastEditTime: 2023-07-04 15:49:21
 * @FilePath: \event-calculator\src\Components\Event\Event.js
 * @Description:
 */
import { Paper } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddParticipantDialog from '../AddParticipantDialog/AddParticipantDialog';
import Chip from '@mui/material/Chip';
import PersonIcon from '@mui/icons-material/Person';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { removeParticipantFromEvent } from '../../Redux/Slice/eventSlice';
import React from 'react';
import './Event.scss';

const EventContainer = (props) => {

    console.log(props)

    const [isAddOpen, setIsAddOpen] = React.useState(false);
    const dispatch = useDispatch();

    const addParticipant = () => {
        setIsAddOpen(true);
    }

    const closeDialog = () => {
        setIsAddOpen(false);
    }

    const handleDelete = () => {}

    const handleRemoveParticipant = (person) => {
        dispatch(removeParticipantFromEvent({
            event: props.eventInfo,
            participantId: person.id
        }))
    }

    return (
        <Paper className='event-container' elevation={3}>
            <Chip label={props.eventInfo.name} color="primary" icon={<TagFacesIcon />}/>
            <Box className='participants-container'>
                {
                    props.eventInfo.participants.map((person) => (
                        <Box key={person.id} className='per-participant-container'>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Chip label={person.name} color="success" size="small" icon={<PersonIcon />}/>
                                <IconButton aria-label="delete" color="error" onClick={() => handleRemoveParticipant(person)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                            <Box className='per-participant-spend-container'>
                                {
                                    person.spendList.map((spend) => (
                                        <Box key={spend.key}>
                                            <Chip
                                                label={spend.value}
                                                size="small"
                                                icon={<AttachMoneyIcon />}
                                                onDelete={handleDelete}
                                                sx={{mr: 1}}
                                            />
                                        </Box>
                                    ))
                                }
                            </Box>
                            <Divider variant='fullWidth' sx={{marginY: 2}}/>
                        </Box>
                    ))
                }
            </Box>
            <Button onClick={addParticipant}>添加参与者</Button>
            <AddParticipantDialog open={isAddOpen} event={props.eventInfo} closeDialog={closeDialog}/>
        </Paper>
    );
};

export default EventContainer;