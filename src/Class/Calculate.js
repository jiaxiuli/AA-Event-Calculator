/*
 * @Author: Leo
 * @Date: 2023-07-04 20:33:55
 * @LastEditors: Leo
 * @LastEditTime: 2023-07-06 20:36:27
 * @FilePath: \event-calculator\src\Class\Calculate.js
 * @Description:
 */

import { v4 as uuidv4 } from "uuid";

export const calculate = (events) => {
  const overallResult = events.map((event) => {
    const result = {
      info: {},
      list: [],
    };
    const numberOfParticipant = event.participants.length;
    let totalSpend = 0;
    event.participants.forEach((item) => {
      item.spendList.forEach((ele) => {
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
    result.info.averageSpend = averageSpend;
    result.info.personSpendMost = personSpendMost;
    event.participants.forEach((item) => {
      if (
        item.id !== personSpendMost.id &&
        averageSpend - item.totalSpend !== 0
      ) {
        if (averageSpend - item.totalSpend > 0) {
          result.list.push({
            key: uuidv4(),
            sender: item,
            receiver: personSpendMost,
            value: (averageSpend - item.totalSpend).toFixed(2),
          });
        } else {
          result.list.push({
            key: uuidv4(),
            sender: personSpendMost,
            receiver: item,
            value: (item.totalSpend - averageSpend).toFixed(2),
          });
        }
      }
    });
    return {
      event,
      result,
    };
  });

  return overallResult;
};

export const mergeTransfer = (results) => {
  console.log(results);
  return results;
};
