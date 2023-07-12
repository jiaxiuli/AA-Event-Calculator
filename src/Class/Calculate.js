/*
 * @Author: Leo
 * @Date: 2023-07-04 20:33:55
 * @LastEditors: Leo
 * @LastEditTime: 2023-07-11 21:05:24
 * @FilePath: \event-calculator\src\Class\Calculate.js
 * @Description:
 */

import { v4 as uuidv4 } from "uuid";

const chipColorList = [
  "#00bfa5",
  "#00b8d4",
  "#0091ea",
  "#455a64",
  "#ff6f00",
  "#bf360c",
  "#ff7043",
  "#78909c",
  "#33691e",
  "#f9a825",
  "#4db6ac",
  "#cddc39",
  "#827717",
  "#1565c0",
  "#c51162",
  "#d32f2f",
];

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
    const averageSpend = Number((totalSpend / numberOfParticipant).toFixed(2));
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
      if (item.id !== personSpendMost.id) {
        if (averageSpend - item.totalSpend >= 0) {
          result.list.push({
            key: uuidv4(),
            sender: item,
            receiver: personSpendMost,
            value: Number((averageSpend - item.totalSpend).toFixed(2)),
          });
        } else {
          result.list.push({
            key: uuidv4(),
            sender: personSpendMost,
            receiver: item,
            value: Number((item.totalSpend - averageSpend).toFixed(2)),
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
  const mergedResults = [];
  const nameToColor = [];
  let totalList = [];

  results.forEach((res, index) => {
    totalList = totalList.concat(res.result.list);
  });

  totalList.forEach((item) => {
    let isFound = false;
    mergedResults.forEach((ele) => {
      if (
        item.sender.id === ele.sender.id &&
        item.receiver.id === ele.receiver.id
      ) {
        ele.value = ele.value + item.value;
        isFound = true;
      }
      if (
        item.sender.id === ele.receiver.id &&
        item.receiver.id === ele.sender.id
      ) {
        ele.value = ele.value - item.value;
        isFound = true;
      }
    });
    if (!isFound) {
      mergedResults.push({ ...item, key: uuidv4() });
    }
  });

  mergedResults.forEach((item, index) => {
    const prevSender = item.sender;
    const prevReceiver = item.receiver;
    const prevValue = item.value;

    if (nameToColor.findIndex((name) => name.nameId === prevSender.id) === -1) {
      nameToColor.push({
        nameId: prevSender.id,
        color: chipColorList[nameToColor.length % chipColorList.length],
      });
    }

    if (
      nameToColor.findIndex((name) => name.nameId === prevReceiver.id) === -1
    ) {
      nameToColor.push({
        nameId: prevReceiver.id,
        color: chipColorList[nameToColor.length % chipColorList.length],
      });
    }

    if (item.value < 0) {
      mergedResults.splice(index, 1, {
        key: uuidv4(),
        sender: prevReceiver,
        receiver: prevSender,
        value: Math.abs(prevValue),
      });
    }
  });
  return {
    resultList: mergedResults,
    nameToColor,
  };
};
