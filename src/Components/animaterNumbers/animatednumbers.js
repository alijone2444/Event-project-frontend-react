import React from "react";
import AnimatedNumbers from "react-animated-numbers";
import { makeStyles } from "@mui/styles";
import { Typography, Grid } from "@mui/material";
import VantaBackground from "../vantaJs/vanta";
import { useSelector } from "react-redux";
function AnimationNumbers() {
    const [num, setNum] = React.useState(50);
    const classes = useStyles();
    const SavedConstants = useSelector(state => state.SavedConstants.constants);

    console.log('here is hehe', SavedConstants)
    return (
        <div className={classes.container}>
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
                <Grid item>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <AnimatedNumbers
                            includeComma
                            className={classes.numbers}
                            transitions={(index) => ({
                                type: "spring",
                                duration: index + 4,
                            })}
                            animateToNumber={SavedConstants.SocietiesCount}
                        />
                        <div>+</div>
                    </div>
                </Grid>
                <Grid item>
                    <Typography variant="h2" margin={0} mt={1} style={{ display: 'flex', alignItems: 'center' }} paddingLeft={1}>
                        Societies
                    </Typography>
                </Grid>
            </Grid>
            <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
                {SavedConstants.SocietyVantaSubheader}
            </Typography>
        </div>
    );
}

const useStyles = makeStyles({
    container: {
        fontSize: 65,
        fontWeight: 'bold',
        color: 'white',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    numbers: {
        width: '100%',
    }
});

export default AnimationNumbers;
