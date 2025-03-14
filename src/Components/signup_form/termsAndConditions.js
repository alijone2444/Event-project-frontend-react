import React from 'react';
import { Button, Typography, Paper } from '@mui/material';
import { makeStyles } from "@mui/styles";
function TermsAndConditions(props) {

  const classes = useStyles();
  return (
    <>
      <div style={{ position: 'relative', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div style={{ height: '80vh', overflowY: 'auto' }} className={classes.container}>
          <Paper style={{ marginTop: '20px', background: 'transparent' }}>
            <Button
              onClick={props.gobackToSignup}
              style={{
                position: 'absolute',
                bottom: 0,
                color: 'dodgerblue',
                width: '100%',
                backdropFilter: 'blur(10px)',  // Corrected to center horizontally
              }}
            >
              Finish Reading
            </Button>
            <Typography
              variant="h5"  // You can adjust this to h5 if you prefer a smaller heading
              paragraph
              style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}
            >
              Terms and Conditions of Use
            </Typography>

            <Typography variant="body1" paragraph style={{ color: 'white' }}>

              1. <strong>Copyright and Usage Restrictions:</strong>
              <ul style={{ paddingLeft: "3%" }}>
                <li>The website is owned and operated by Institute of Space and Technology.</li>
                <li>Material from SignUp.com may only be used for personal, non-commercial purposes.</li>
                <li>Users may not copy, reproduce, or distribute materials without permission.</li>
                <li>No modification of materials is allowed.</li>
              </ul>
              <br />
              2. <strong>Disclaimer of Accuracy:</strong>
              <ul style={{ paddingLeft: "3%" }}>
                <li>Eventive does not guarantee the accuracy of information on the site.</li>
                <li>Users are responsible for the risks associated with providing personal information.</li>
              </ul>
              <br />
              3. <strong>Event Participation:</strong>
              <ul style={{ paddingLeft: "3%" }}>
                <li>Eventive does not supervise events and is not liable for any damages resulting from them.</li>
                <li>Users participate in events at their own discretion and assume all associated risks.</li>
              </ul>
              <br />
              4. <strong>Waiver and Release:</strong>
              <ul style={{ paddingLeft: "3%" }}>
                <li>Users acknowledge and release Eventive from any liability related to events.</li>
                <li>A waiver may be provided, and users are responsible for verifying and acknowledging it.</li>
              </ul>
              <br />
              5. <strong>External Links:</strong>
              <ul style={{ paddingLeft: "3%" }}>
                <li>The site may contain links to external sites, and Eventive is not responsible for their content.</li>
              </ul>
              <br />
              6. <strong>User-Generated Content:</strong>
              <ul style={{ paddingLeft: "3%" }}>
                <li>Users may post content, but offensive or unlawful content is prohibited.</li>
                <li>Eventive may remove or edit user-generated content.</li>
              </ul>
              <br />
              7. <strong>Grant of License:</strong>
              <ul style={{ paddingLeft: "3%" }}>
                <li>By posting content, users grant Eventive a license to use, reproduce, and display the content.</li>
              </ul>
              <br />
              8. <strong>Changes to Terms and Conditions:</strong>
              <ul style={{ paddingLeft: "3%" }}>
                <li>Eventive may revise terms and conditions, and users are bound by the latest version.</li>
              </ul>
              <br />
              9. <strong>Prohibited Activities:</strong>
              <ul style={{ paddingLeft: "3%" }}>
                <li>Users must not engage in activities that violate laws or industry regulations.</li>
                <li>Prohibited activities include illegal sales, promotion of fraudulent schemes, and violations of applicable laws.</li>
              </ul>
              <br />
              10. <strong>Acceptable Use Policy:</strong>
              <ul style={{ paddingLeft: "3%" }}>
                <li>Users must comply with the Acceptable Use Policy, reporting violations to Eventive.</li>
              </ul>
              <br />
              11. <strong>Reporting Violations:</strong>
              <ul style={{ paddingLeft: "3%" }}>
                <li>Users are encouraged to report policy violations to Eventive.</li>
              </ul>
              <br />
              12. <strong>Definitions:</strong>
              <ul style={{ paddingLeft: "3%" }}>
                <li>Service: Eventive website.</li>
                <li>User: Individual or entity registering an account.</li>
                <li>Contributor: Individual contributing funds.</li>
              </ul>
              <br />
              13. <strong>Legal Representations:</strong>
              <ul style={{ paddingLeft: "3%" }}>
                <li>Users represent that funds obtained through Eventive will be used for specified purposes.</li>
                <li>Users must comply with local, state, and federal laws in fundraising activities.</li>
              </ul>
              <br />
              14. <strong>Age Requirement:</strong>
              <ul style={{ paddingLeft: "3%" }}>
                <li>Users contributing funds must be at least 18 years old.</li>
              </ul>
              <br />
              15. <strong>Contact and Questions:</strong>
              <ul style={{ paddingLeft: "3%" }}>
                <li>Users may contact Eventive for questions or to report violations.</li>
              </ul>
              <br />
              By signing up to the website, users agree to abide by these terms and conditions.
            </Typography>
          </Paper>
        </div>
      </div>
    </>
  );
}
const useStyles = makeStyles((theme) => ({
  container: {
    scrollbarWidth: 'thin',  // For Firefox
    '&::-webkit-scrollbar': {
      display: 'none'
    },
  },
}));
export default TermsAndConditions;
