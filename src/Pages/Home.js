/*
 * @Author: Leo
 * @Date: 2023-07-04 11:53:35
 * @LastEditors: Leo
 * @LastEditTime: 2023-07-06 20:36:07
 * @FilePath: \event-calculator\src\Pages\Home.js
 * @Description:
 */
import React from "react";
import Box from "@mui/material/Box";
import Header from "../Components/Header/Header";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { addEvent } from "../Redux/Slice/eventSlice";
import { Paper } from "@mui/material";
import Event from "../Class/Event";
import EventContainer from "../Components/Event/Event";
import { calculate, mergeTransfer } from "../Class/Calculate";
import ResultDialog from "../Components/ResultDialog/ResultDialog";
import "./Home.scss";

const Home = () => {
  const events = useSelector((state) => state.event.eventList);
  const counter = useSelector((state) => state.event.eventCounter);

  const [result, setResult] = React.useState([]);
  const [mergedResult, setMergedResult] = React.useState([]);
  const [resultOpen, setResultOpen] = React.useState(false);

  const dispatch = useDispatch();

  const handleAddEvent = () => {
    dispatch(addEvent(new Event(counter)));
  };

  const executeCalculate = () => {
    const resultList = calculate(events);
    setResult(resultList);
    if (events.length > 1) {
      const mergedResultList = mergeTransfer(resultList);
      setMergedResult(mergedResultList);
    }
    openResultDialog();
  };

  const openResultDialog = () => {
    setResultOpen(true);
  };

  const closeResultDialog = () => {
    setResultOpen(false);
  };

  return (
    <Box className="main">
      <Header></Header>
      <Box className="calculator">
        {events.map((event) => (
          <EventContainer key={event.id} eventInfo={event}>
            {event.id}
          </EventContainer>
        ))}
        <Button variant="contained" onClick={handleAddEvent}>
          添加活动
        </Button>
      </Box>
      <Paper elevation={6} className="footer">
        <Button
          variant="contained"
          fullWidth
          onClick={executeCalculate}
          disabled={!events.length}
        >
          计算
        </Button>
      </Paper>
      <ResultDialog
        open={resultOpen}
        handleClose={closeResultDialog}
        result={result}
        mergedResult={mergedResult}
      ></ResultDialog>
    </Box>
  );
};

export default Home;
