/*
 * @Author: Leo
 * @Date: 2023-07-04 12:22:12
 * @LastEditors: Leo
 * @LastEditTime: 2023-07-05 20:09:26
 * @FilePath: \event-calculator\src\Redux\Slice\eventSlice.js
 * @Description:
 */
import { createSlice } from '@reduxjs/toolkit'
import Participant from '../../Class/Participant';

const initialState = {
  eventList: [],
  eventCounter: 0,
  commonParticipant: [
    new Participant('BBD', [], 'bbd'),
    new Participant('咪咪', [], 'mimi'),
    new Participant('Nancy', [], 'nancy'),
    new Participant('Kerry', [], 'kerry'),
    new Participant('华哥', [], 'keith'),
    new Participant('S哥', [], 'stanley'),
  ]
}

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    addEvent: (state, action) => {
        state.eventList.push(action.payload);
        state.eventCounter++;
    },

    removeEvent: (state, action) => {
        const newList = state.eventList.filter((item) => item.id !== action.payload.eventId);
        state.eventList = [...newList];
    },

    editParticipant: (state, action) => {
        action.payload.prevPart.editParticipant(action.payload.currentPart);
        state.eventList = [...state.eventList];
    },

    addParticipantToEvent: (state, action) => {
        action.payload.event.addParticipant(action.payload.participant);
    },

    removeParticipantFromEvent: (state, action) => {
        action.payload.event.removeParticipant(action.payload.participantId);
        state.eventList = [...state.eventList];
    },

    clearAll: (state) => {
        state.eventList = [];
        state.eventCounter = 0;
    },
  },
})

// Action creators are generated for each case reducer function
export const {
    addEvent,
    removeEvent,
    addParticipantToEvent,
    removeParticipantFromEvent,
    editParticipant,
    clearAll
} = eventSlice.actions;

export default eventSlice.reducer;