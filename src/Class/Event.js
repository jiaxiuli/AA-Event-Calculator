/*
 * @Author: Leo
 * @Date: 2023-07-04 12:34:13
 * @LastEditors: Leo
 * @LastEditTime: 2023-07-06 20:10:00
 * @FilePath: \event-calculator\src\Class\Event.js
 * @Description:
 */
import { v4 as uuidv4 } from "uuid";

const Event = class {
  constructor(eventNum) {
    this.id = uuidv4();
    this.participants = [];
    this.name = "活动" + (eventNum + 1);
  }

  changeName = (name) => {
    this.name = name;
  };

  addParticipant = (participant) => {
    this.participants.push(participant);
  };

  removeParticipant = (id) => {
    this.participants = this.participants.filter((item) => item.id !== id);
  };

  updateCommonParticipantsByList = (participantList) => {
    participantList.forEach((person) => {
      if (this.participants.findIndex((item) => item.id === person.id) === -1) {
        this.participants.push(person);
      }
    });
    this.participants.forEach((participant) => {
      if (
        participantList.findIndex((person) => person.id === participant.id) ===
          -1 &&
        participant.isCommonParticipant
      ) {
        this.removeParticipant(participant.id);
      }
    });
  };
};

export default Event;
