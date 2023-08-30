import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const SupportPage: React.FC = () => {
  return (
    <div style={{ position: "relative", height: "100%" }}>
      <img
        src="https://images.pexels.com/photos/4481326/pexels-photo-4481326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Background"
        style={backgroundImageStyle}
      />
      <Box
        sx={{
          marginTop: 2,
          padding: 3,
          maxWidth: "md",
          margin: "0 auto",
        }}
      >
        <Paper
          sx={{
            padding: 3,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Support Page
          </Typography>
          <Typography variant="body1">
            Welcome to our support page. If you have any questions or need
            assistance, please feel free to contact us using one of the methods
            below:
          </Typography>
          <Typography variant="body1">
            - Email: brianmwendwa.mu@gmail.com
          </Typography>
          <Typography variant="body1">- Phone: +254-796-898-480</Typography>
          <Typography variant="body1">
            Our support team is available during business hours to help you with
            any inquiries or issues.
          </Typography>
        </Paper>
      </Box>
    </div>
  );
};

export default SupportPage;

const backgroundImageStyle = {
  filter: "blur(1px)", // Adjust the blur amount as needed
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  opacity: 0.7, // Adjust the opacity as needed
  zIndex: -1,
  backgroundSize: "cover",
  backgroundPosition: "center",
};
