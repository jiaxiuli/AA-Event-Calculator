/*
 * @Author: Leo
 * @Date: 2023-07-04 13:30:17
 * @LastEditors: Leo
 * @LastEditTime: 2023-07-11 19:38:19
 * @FilePath: \event-calculator\src\Components\AddParticipantDialog\AddParticipantDialog.js
 * @Description:
 */
import React from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { v4 as uuidv4 } from "uuid";
import DeleteIcon from "@mui/icons-material/Delete";
import Participant from "../../Class/Participant";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import {
  addParticipantToEvent,
  editParticipant,
} from "../../Redux/Slice/eventSlice";
import "./dialog.scss";

const AddParticipantDialog = (props) => {
  const [name, setName] = React.useState("");
  const [nameValid, setNameValid] = React.useState(true);
  const [spendList, setSpendList] = React.useState([]);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (props.participantInfo) {
      setName(props.participantInfo.name);
      setSpendList(props.participantInfo.spendList);
    } else {
      clearForm();
    }
  }, [props]);

  const handleEditName = (event) => {
    setName(event.target.value);
    setNameValid(true);
  };

  const handleAddSpendAmount = () => {
    setSpendList((prev) => {
      prev.push({
        key: uuidv4(),
        value: "",
      });
      return [...prev];
    });
  };

  const handleEditAmount = (event, item) => {
    var reg = /^[0-9]+\.?[0-9]*$/;
    if (reg.test(event.target.value) || event.target.value === "") {
      setSpendList((prev) => {
        item.value =
          event.target.value === "" ? "" : Number(event.target.value);
        return [...prev];
      });
    }
  };

  const handleDeleteAmount = (item) => {
    setSpendList((prev) => {
      return prev.filter((ele) => ele.key !== item.key);
    });
  };

  const handleCompleteAddParticipant = () => {
    if (!name) {
      setNameValid(false);
      return;
    }
    const clearedSpendList = clearSpendList();

    if (props.participantInfo) {
      // edit participant
      dispatch(
        editParticipant({
          prevPart: props.participantInfo,
          currentPart: {
            ...props.participantInfo,
            name,
            spendList: clearedSpendList,
          },
        })
      );
    } else {
      // add new participant
      const participant = new Participant(name, clearedSpendList);
      dispatch(
        addParticipantToEvent({
          event: props.event,
          participant,
        })
      );
    }
    closeDialog();
  };

  const clearSpendList = () => {
    const newList = spendList.filter((item) => Number(item.value));
    if (!newList.length) {
      newList.push({
        key: uuidv4(),
        value: 0,
      });
    }
    return newList;
  };

  const clearForm = () => {
    setName("");
    setSpendList([]);
  };

  const closeDialog = () => {
    clearForm();
    props.closeDialog();
  };

  return (
    <Dialog open={props.open}>
      <Box className="add-participant-dialog-main">
        <DialogTitle
          sx={{
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingX: 0,
          }}
        >
          <Box>{props.participantInfo ? "编辑参与者" : "添加参与者"}</Box>
          <IconButton onClick={closeDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <FormGroup variant="standard">
          <Box sx={{ mb: 4 }}>
            <InputLabel sx={{ fontSize: 12 }}>参与者名称</InputLabel>
            <Input
              id="input-participant-name"
              value={name}
              error={!nameValid}
              onChange={handleEditName}
              disabled={props.participantInfo?.isCommonParticipant}
              sx={{ width: "100%" }}
              autoComplete="off"
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle color={nameValid ? "" : "error"} />
                </InputAdornment>
              }
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            {spendList.map((item, index) => (
              <Box key={item.key} className="per-participant">
                <Box sx={{ pr: 2, boxSizing: "border-box" }}>
                  <InputLabel sx={{ fontSize: 12 }}>
                    {"花费金额" + (index + 1)}
                  </InputLabel>
                  <Input
                    id="input-participant-spend-amount"
                    type="number"
                    autoComplete="off"
                    value={item.value}
                    onChange={(event) => handleEditAmount(event, item)}
                    startAdornment={
                      <InputAdornment position="start">
                        <AttachMoneyIcon />
                      </InputAdornment>
                    }
                  />
                </Box>
                <IconButton
                  aria-label="delete"
                  color="error"
                  onClick={() => handleDeleteAmount(item)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={handleAddSpendAmount}
              sx={{ mb: 2, width: "fit-content" }}
            >
              添加花费金额
            </Button>
          </Box>
        </FormGroup>
        <Button
          variant="contained"
          onClick={handleCompleteAddParticipant}
          sx={{ mb: 2 }}
        >
          {props.participantInfo ? "完成编辑" : "完成添加"}
        </Button>
      </Box>
      <Alert
        sx={{
          position: "fixed",
          visibility: nameValid ? "hidden" : "visible",
          top: 20,
          zIndex: 2,
          left: "50%",
          whiteSpace: "nowrap",
          transform: "translateX(-50%)",
        }}
        severity="error"
      >
        Name cannot be empty
      </Alert>
    </Dialog>
  );
};

export default AddParticipantDialog;
