/*
 * @Author: Leo
 * @Date: 2023-07-04 12:22:12
 * @LastEditors: Leo
 * @LastEditTime: 2023-07-04 16:24:47
 * @FilePath: \event-calculator\src\Redux\Slice\eventSlice.js
 * @Description:
 */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  eventList: [],
}

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    addEvent: (state, action) => {
        state.eventList.push(action.payload);
    },

    addParticipantToEvent: (state, action) => {
        action.payload.event.addParticipant(action.payload.participant);
    },

    removeParticipantFromEvent: (state, action) => {
        action.payload.event.removeParticipant(action.payload.participantId);
        state.eventList = [...state.eventList]
    },
  },
})

// Action creators are generated for each case reducer function
export const { addEvent, addParticipantToEvent, removeParticipantFromEvent } = eventSlice.actions;

export default eventSlice.reducer;