import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, IconButton, Typography } from "@material-ui/core";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useContext } from "react";
import { UserContext } from "../../pages/homePage";
import img from "../../assets/imgs/avologo.png";

// framer motion
import { motion } from "framer-motion";

// react-alert
import { useAlert } from "react-alert";

//firebaseAuth
import firebaseAuth from "../firebase";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: theme.spacing(10),
    borderRadius: theme.spacing(2, 2, 0, 0),
    padding: theme.spacing(3, 6, 0, 6),
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(8),
      padding: theme.spacing(1.5, 2.5, 0, 2.5),
    },
  },
  title: {
    color: "#2F4851",
    letterSpacing: "-1.5px",
  },
  userInfo: {
    paddingTop: 11,
    height: 46,
  },
  logo: {
    width: 200,
    [theme.breakpoints.down('xs')]: {
      width: 140,
    },
  }
}));

const HeaderInfo = () => {
  const alert = useAlert();
  const classes = useStyles();
  const hist = useHistory();
  const user = useContext(UserContext);

  const signOut = () => {
    try {
      firebaseAuth
        .logout()
        .then((res) => {
          alert.success("Log out successfully!");
          window.localStorage.clear();
          hist.push({
            pathname: "/signin",
          });
        })
        .catch((err) => {
          alert.error(err.message);
        });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
        >
          <Grid item className={classes.title} xs={4}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
            >
              <img className={classes.logo} src={img} alt="logo" />
            </motion.div>
          </Grid>
          <Grid item xs className={classes.userInfo}>
            {user.displayName != null ? (
              <Typography
                align="right"
                component="p"
                variant="body1"
              >
                Hello, {user.displayName}
              </Typography>
            ) : (
              <Typography component="span" variant="body1">
                unKnown
              </Typography>
            )}
          </Grid>
          <Grid item xs="auto" align="right">
            <IconButton onClick={signOut}>
              <ExitToAppIcon />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default HeaderInfo;
