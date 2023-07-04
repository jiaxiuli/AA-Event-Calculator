/*
 * @Author: Leo
 * @Date: 2023-07-04 13:30:17
 * @LastEditors: Leo
 * @LastEditTime: 2023-07-04 15:45:50
 * @FilePath: \event-calculator\src\Components\AddParticipantDialog\AddParticipantDialog.js
 * @Description:
 */
import React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormGroup  from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';
import Participant from '../../Class/Participant';
import { useDispatch } from 'react-redux';
import { addParticipantToEvent } from '../../Redux/Slice/eventSlice';
import './dialog.scss';


const AddParticipantDialog = (props) => {

    const [name, setName] = React.useState("");
    const [spendList, setSpendList] = React.useState([]);

    const dispatch = useDispatch();

    const handleEditName = (event) => {
        setName(event.target.value);
    }

    const handleAddSpendAmount = () => {
        setSpendList((prev) => {
            prev.push({
                key: uuidv4(),
                value: ""
            });
            return [...prev];
        });
    }

    const handleEditAmount = (event, item) => {
        setSpendList((prev) => {
            item.value = event.target.value;
            return [...prev];
        });
    }

    const handleDeleteAmount = (item) => {
        setSpendList((prev) => {
            return prev.filter((ele) => ele.key !== item.key);
        });
    }

    const handleCompleteAddParticipant = () => {
        const participant = new Participant(name, spendList);
        dispatch(addParticipantToEvent({
            event: props.event,
            participant
        }));
        props.closeDialog();
        clearForm();
    }

    const clearForm = () => {
        setName("");
        setSpendList([]);
    }

    return (
        <Dialog open={props.open}>
            <Box className='add-participant-dialog-main'>
                <DialogTitle sx={{fontSize: 16, textAlign: 'center'}}>添加参与者</DialogTitle>
                <FormGroup variant="standard">
                    <Box sx={{mb: 4}}>
                        <InputLabel sx={{fontSize: 12}}>
                            参与者名称
                        </InputLabel>
                        <Input
                            id="input-participant-name"
                            value={name}
                            onChange={handleEditName}
                            startAdornment={
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            }
                        />
                    </Box>
                    <Box sx={{mb: 2}}>
                    {
                        spendList.map((item, index) => (
                            <Box key={item.key} className='per-participant'>
                                <Box sx={{pr: 2, boxSizing: 'border-box'}}>
                                    <InputLabel sx={{fontSize: 12}}>
                                        {'花费金额' + (index + 1)}
                                    </InputLabel>
                                    <Input
                                        id="input-participant-spend-amount"
                                        type="number"
                                        value={item.value}
                                        onChange={(event) => handleEditAmount(event, item)}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <AttachMoneyIcon />
                                            </InputAdornment>
                                        }
                                    />
                                </Box>
                                <IconButton aria-label="delete" color="error" onClick={() => handleDeleteAmount(item)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        ))
                    }
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Button onClick={handleAddSpendAmount} sx={{mb: 2, width: 'fit-content'}}>添加花费金额</Button>
                    </Box>
                </FormGroup>
                <Button variant="contained" onClick={handleCompleteAddParticipant} sx={{mb: 2}}>完成</Button>
            </Box>
        </Dialog>
      );
};

export default AddParticipantDialog;