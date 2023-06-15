import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

interface CardProps {
  title: string;
  value: number;
  percentage: string;
}

const BasicCard = (props: CardProps) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.title}
        </Typography>
        <Box sx={valueStyle}>
          <Typography variant="h5" component="div">
            {props.value}
          </Typography>
          <Box sx={percentageStyle}>
            <TrendingUpIcon />
            <Typography variant="body1" component="div">
              {props.percentage}
            </Typography>
          </Box>
        </Box>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          You made <span style={{ color: "#1890ff" }}> {props.value}</span> this
          year
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BasicCard;

const valueStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

const percentageStyle = {
  width: "100px",
  backgroundColor: "#1890ff",
  py: 0.5,
  mx: 2,
  borderRadius: 2,
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  color: "white",
};
