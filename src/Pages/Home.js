/*
 * @Author: Leo
 * @Date: 2023-07-04 11:53:35
 * @LastEditors: Leo
 * @LastEditTime: 2023-07-04 14:46:11
 * @FilePath: \event-calculator\src\Pages\Home.js
 * @Description:
 */
import React from 'react';
import Box from '@mui/material/Box';
import Header from '../Components/Header/Header';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { addEvent } from '../Redux/Slice/eventSlice';
import Event from '../Class/Event';
import EventContainer from '../Components/Event/Event';
import './Home.scss';

const Home = () => {

    const events = useSelector((state) => state.event.eventList);
    const dispatch = useDispatch();

    const handleAddEvent = () => {
        dispatch(addEvent(new Event(events.length)));
    }
    console.log(events)

    return (
        <Box className="main">
            <Header></Header>
            <Box className='calculator'>
                {
                    events.map((event) => (
                        <EventContainer key={event.id} eventInfo={event}>{event.id}</EventContainer>
                    ))
                }
                <Button variant="contained" onClick={handleAddEvent}>添加活动</Button>
            </Box>
        </Box>
    );
};

export default Home;