/*
 * @Author: Leo
 * @Date: 2023-07-05 20:01:31
 * @LastEditors: Leo
 * @LastEditTime: 2023-07-05 20:37:46
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
import { useSelector } from "react-redux";

import "./CommonParticipantList.scss";

const CommonParticipantList = (props) => {
  const commonList = useSelector((state) => state.event.commonParticipant);

  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleCompleteSelection = () => {
    props.closeDialog();
  };

  return (
    <Dialog open={props.open}>
      <Box className="add-common-participant-dialog-main">
        <DialogTitle sx={{ textAlign: "center" }}>选择常用参与者</DialogTitle>
        <Box>
          {/* {
                        commonList.map((person) => (<div>{person.name}</div>))
                    } */}
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
                      checked={checked.indexOf(value) !== -1}
                    />
                  </ListItemIcon>
                  <ListItemText id={value.id} primary={value.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <Button variant="contained" onClick={handleCompleteSelection}>
        完成
      </Button>
    </Dialog>
  );
};

export default CommonParticipantList;
