/*
 * @Author: Leo
 * @Date: 2023-07-04 20:33:55
 * @LastEditors: Leo
 * @LastEditTime: 2023-07-04 21:40:21
 * @FilePath: \event-calculator\src\Class\Calculate.js
 * @Description:
 */

import { v4 as uuidv4 } from 'uuid';


const calculate = (events) => {

    const overallResult = events.map((event) => {
        const result = [];
        const numberOfParticipant = event.participants.length;
        let totalSpend = 0;
        event.participants.forEach(item => {
            item.spendList.forEach(ele => {
                totalSpend = totalSpend + ele.value;
            });
        });
        const averageSpend = (totalSpend / numberOfParticipant).toFixed(2);
        // get the person who spend the most
        let personSpendMost = event.participants[0];
        event.participants.forEach((item) => {
            if (item.totalSpend > personSpendMost.totalSpend) {
                personSpendMost = item;
            }
        });
        event.participants.forEach((item) => {
            if (item.id !== personSpendMost.id) {
                if (averageSpend - item.totalSpend >= 0) {
                    result.push({
                        key: uuidv4(),
                        sender: item.name,
                        receiver: personSpendMost.name,
                        value: (averageSpend - item.totalSpend).toFixed(2)
                    });
                } else {
                    result.push({
                        key: uuidv4(),
                        sender: personSpendMost.name,
                        receiver: item.name,
                        value: (item.totalSpend - averageSpend).toFixed(2)
                    });
                }
            }
        });
        return {event, result};
    });

    return overallResult;
};

export default calculate;