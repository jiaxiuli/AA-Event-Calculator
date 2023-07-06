/*
 * @Author: Leo
 * @Date: 2023-07-04 12:39:55
 * @LastEditors: Leo
 * @LastEditTime: 2023-07-05 20:19:16
 * @FilePath: \event-calculator\src\Class\Participant.js
 * @Description: 
 */
import { v4 as uuidv4 } from 'uuid';


const Participant = class {

    constructor(name, spendList, id) {
        this.id = id || uuidv4();
        this.name = name;
        this.spendList = spendList;
        this.totalSpend = Number(spendList.reduce((sum, next) => sum + next.value, 0).toFixed(2));
        this.isCommonParticipant = Boolean(id);
    }

    editParticipant = (newParticipant) => {
        this.name = newParticipant.name;
        if (!newParticipant.spendList.length) {
            this.spendList = [{
                key: uuidv4(),
                value: 0
            }];
            this.totalSpend = 0;
        } else {
            this.spendList = newParticipant.spendList;
            this.totalSpend = Number(this.spendList.reduce((sum, next) => sum + next.value, 0).toFixed(2));
        }
    }
}

export default Participant;