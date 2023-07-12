/*
 * @Author: Leo
 * @Date: 2023-07-04 12:22:12
 * @LastEditors: Leo
 * @LastEditTime: 2023-07-11 21:23:16
 * @FilePath: \event-calculator\src\Redux\Slice\eventSlice.js
 * @Description:
 */
import { createSlice } from "@reduxjs/toolkit";
import Event from "../../Class/Event";

const initialState = {
  eventList: [new Event(0)],
  eventCounter: 1,
  commonParticipant: [
    { name: "BBD", id: "leo" },
    { name: "咪咪", id: "mimi" },
    { name: "Nancy", id: "nancy" },
    { name: "Kerry", id: "kerry" },
    { name: "华哥", id: "keith" },
    { name: "S哥", id: "stanley" },
  ],
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.eventList.push(action.payload);
      state.eventCounter++;
    },

    removeEvent: (state, action) => {
      const newList = state.eventList.filter(
        (item) => item.id !== action.payload.eventId
      );
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

    updateCommonParticipantsByList: (state, action) => {
      action.payload.event.updateCommonParticipantsByList(
        action.payload.participantList
      );
      state.eventList = [...state.eventList];
    },

    clearAll: (state) => {
      state.eventList = [];
      state.eventCounter = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addEvent,
  removeEvent,
  addParticipantToEvent,
  removeParticipantFromEvent,
  editParticipant,
  updateCommonParticipantsByList,
  clearAll,
} = eventSlice.actions;

export default eventSlice.reducer;
