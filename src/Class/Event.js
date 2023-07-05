/*
 * @Author: Leo
 * @Date: 2023-07-04 12:34:13
 * @LastEditors: Leo
 * @LastEditTime: 2023-07-04 19:53:21
 * @FilePath: \event-calculator\src\Class\Event.js
 * @Description:
 */
import { v4 as uuidv4 } from 'uuid';

const Event = class {

    constructor(eventNum) {
        this.id = uuidv4();
        this.participants = [];
        this.name = "活动" + (eventNum + 1);
    }

    changeName = (name) => {
        this.name = name;
    }

    addParticipant = (participant) => {
        this.participants.push(participant);
    }

    removeParticipant = (id) => {
        this.participants = this.participants.filter((item) => item.id !== id);
    }
}

export default Event;