/*
 * @Author: Leo
 * @Date: 2023-07-04 12:39:55
 * @LastEditors: Leo
 * @LastEditTime: 2023-07-04 14:44:15
 * @FilePath: \event-calculator\src\Class\Participant.js
 * @Description: 
 */
import { v4 as uuidv4 } from 'uuid';


const Participant = class {

    constructor(name, spendList) {
        this.id = uuidv4();
        this.name = name;
        this.spendList = spendList;
    }

    // changeName = (name) => {
    //     this.name = name;
    // }

    // spend = (amount) => {
    //     this.spendList.push({
    //         key: uuidv4(),
    //         value: amount
    //     });
    // }

    // cancelSpend = (key) => {
    //     const newSpendList = this.spendList.map((item) => item.key !== key);
    //     this.spendList = [...newSpendList];
    // }
}

export default Participant;