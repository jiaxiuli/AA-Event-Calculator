/*
 * @Author: Leo
 * @Date: 2023-07-05 20:01:31
 * @LastEditors: Leo
 * @LastEditTime: 2023-07-06 20:46:05
 * @FilePath: \event-calculator\src\Components\CommonParticipantListDialog\CommonParticipantList.js
 * @Description:
 */
import React from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import Button from "@mui/material/Button";
import { updateCommonParticipantsByList } from "../../Redux/Slice/eventSlice";
import { useSelector, useDispatch } from "react-redux";

import "./CommonParticipantList.scss";

const CommonParticipantList = (props) => {
  const commonList = useSelector((state) => state.event.commonParticipant);

  const [checked, setChecked] = React.useState([]);

  React.useEffect(() => {
    const currentList = [];
    props.event.participants.forEach((part) => {
      if (part.isCommonParticipant) {
        currentList.push({ ...part });
      }
    });
    setChecked(currentList);
  }, [props.event.participants]);

  const dispatch = useDispatch();

  const handleToggle = (value) => () => {
    const currentIndex = checked.findIndex((item) => value.id === item.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push({ ...value });
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleCompleteSelection = () => {
    dispatch(
      updateCommonParticipantsByList({
        event: props.event,
        participantList: [...checked],
      })
    );
    props.closeDialog();
  };

  return (
    <Dialog open={props.open}>
      <Box className="add-common-participant-dialog-main">
        <DialogTitle sx={{ textAlign: "center" }}>选择常用参与者</DialogTitle>
        <Box>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {commonList.map((value) => (
              <ListItem
                key={value.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="comments">
                    <CommentIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton onClick={handleToggle(value)}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={
                        checked.findIndex((item) => value.id === item.id) !== -1
                      }
                    />
                  </ListItemIcon>
                  <ListItemText id={value.id} primary={value.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Button
          sx={{ width: "60%" }}
          variant="contained"
          onClick={handleCompleteSelection}
        >
          完成
        </Button>
      </Box>
    </Dialog>
  );
};

export default CommonParticipantList;
