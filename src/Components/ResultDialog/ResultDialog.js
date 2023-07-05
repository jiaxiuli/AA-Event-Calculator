/*
 * @Author: Leo
 * @Date: 2023-07-04 21:08:53
 * @LastEditors: Leo
 * @LastEditTime: 2023-07-04 21:39:39
 * @FilePath: \event-calculator\src\Components\ResultDialog\ResultDialog.js
 * @Description:
 */
import React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Paper } from '@mui/material';
import Chip from '@mui/material/Chip';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { clearAll } from '../../Redux/Slice/eventSlice';
import { useDispatch } from 'react-redux';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const ResultDialog = (props) => {

    const dispatch = useDispatch();

    const startOver = () => {
        dispatch(clearAll());
        props.handleClose();
    };

    return (
        <Dialog
            fullScreen
            open={props.open}
            onClose={props.handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={props.handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        计算结果
                    </Typography>
                    <Button autoFocus color="inherit" onClick={startOver}>
                        重新开始
                    </Button>
                </Toolbar>
            </AppBar>
            <Box>
                {
                    props.result.map((item) => (
                        <Paper className='event-container' elevation={3} key={item.event.id}>
                            <Box>
                                <Chip label={item.event.name} color="primary" variant="outlined" icon={<TagFacesIcon />}/>
                                <Box sx={{mt: 2}}>
                                    {
                                        item.result.map((ele) => (
                                            <List key={ele.key}>
                                                <ListItem>
                                                    <Chip label={ele.sender} color="primary" size="small" sx={{mr: 1}}/>
                                                    向
                                                    <Chip label={ele.receiver} color="success" size="small" sx={{marginX: 1}}/>
                                                    转账
                                                    <Chip label={"$" + ele.value} size="small" sx={{ml: 1}}/>
                                                </ListItem>
                                                <Divider />
                                            </List>
                                        ))
                                    }
                                </Box>
                            </Box>
                        </Paper>
                    ))
                }
            </Box>
        </Dialog>
    );
};

export default ResultDialog;