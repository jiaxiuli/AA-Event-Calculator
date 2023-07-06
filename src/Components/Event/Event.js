/*
 * @Author: Leo
 * @Date: 2023-07-04 12:47:59
 * @LastEditors: Leo
 * @LastEditTime: 2023-07-05 20:37:33
 * @FilePath: \event-calculator\src\Components\Event\Event.js
 * @Description:
 */
import { Paper } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddParticipantDialog from "../AddParticipantDialog/AddParticipantDialog";
import CommonParticipantList from "../CommonParticipantListDialog/CommonParticipantList";
import Chip from "@mui/material/Chip";
import PersonIcon from "@mui/icons-material/Person";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import {
  removeEvent,
  removeParticipantFromEvent,
  editParticipant,
} from "../../Redux/Slice/eventSlice";
import React from "react";
import "./Event.scss";

const EventContainer = (props) => {
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [participantInfo, setParticipantInfo] = React.useState();
  const [isCommonOpen, setIsCommonOpen] = React.useState(false);

  const dispatch = useDispatch();

  const addParticipant = () => {
    setParticipantInfo(null);
    openAddParticipantDialog();
  };

  const addCommonParticipant = () => {
    openCommonParticipantDialog();
  };

  const openAddParticipantDialog = () => {
    setIsAddOpen(true);
  };

  const closeAddParticipantDialog = () => {
    setIsAddOpen(false);
  };

  const openCommonParticipantDialog = () => {
    setIsCommonOpen(true);
  };

  const closeCommonParticipantDialog = () => {
    setIsCommonOpen(false);
  };

  const handleDeleteAmount = (spend, person) => {
    dispatch(
      editParticipant({
        prevPart: person,
        currentPart: {
          ...person,
          spendList: person.spendList.filter((item) => item.key !== spend.key),
        },
      })
    );
  };

  const handleRemoveParticipant = (person) => {
    dispatch(
      removeParticipantFromEvent({
        event: props.eventInfo,
        participantId: person.id,
      })
    );
  };

  const handleRemoveEvent = () => {
    dispatch(removeEvent({ eventId: props.eventInfo.id }));
  };

  const handleEditParticipant = (person) => {
    openAddParticipantDialog();
    setParticipantInfo(person);
  };

  return (
    <Paper className="event-container" elevation={3}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Chip
          label={props.eventInfo.name}
          color="primary"
          icon={<TagFacesIcon />}
        />
        <IconButton aria-label="delete" onClick={handleRemoveEvent}>
          <HighlightOffIcon />
        </IconButton>
      </Box>
      <Box className="participants-container">
        {props.eventInfo.participants.map((person) => (
          <Box key={person.id} className="per-participant-container">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Chip
                  label={person.name}
                  color="success"
                  size="small"
                  sx={{ mr: 1 }}
                  icon={<PersonIcon />}
                />
                <Chip
                  label={"Total: " + person.totalSpend}
                  color="primary"
                  variant="outlined"
                  size="small"
                  icon={<AttachMoneyIcon />}
                />
              </Box>
              <Box>
                <IconButton
                  color="info"
                  onClick={() => handleEditParticipant(person)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  color="error"
                  onClick={() => handleRemoveParticipant(person)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
            <Box className="per-participant-spend-container">
              {person.spendList.map((spend) => (
                <Box key={spend.key}>
                  <Chip
                    label={spend.value}
                    size="small"
                    icon={<AttachMoneyIcon />}
                    onDelete={() => handleDeleteAmount(spend, person)}
                    sx={{ mr: 1 }}
                  />
                </Box>
              ))}
            </Box>
            <Divider variant="fullWidth" sx={{ marginY: 2 }} />
          </Box>
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={addParticipant}>新建参与者</Button>
        <Button onClick={addCommonParticipant}>添加常用参与者</Button>
      </Box>
      <AddParticipantDialog
        open={isAddOpen}
        event={props.eventInfo}
        closeDialog={closeAddParticipantDialog}
        participantInfo={participantInfo}
      />
      <CommonParticipantList
        open={isCommonOpen}
        closeDialog={closeCommonParticipantDialog}
      />
    </Paper>
  );
};

export default EventContainer;
