import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";

import blog1 from "../../../assets/home/porto45-blog-22.jpg";
// import blog2 from "../../../assets/home/porto45-blog-42.jpg";
// import blog3 from "../../../assets/home/porto45-blog-32.jpg";
// import blog4 from "../../../assets/home/porto45-blog-12.jpg";

const FeaturedBlog = () => {
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red"[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              {/* <MoreVertIcon /> */}
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          image={blog1}
          alt="Paella dish"
        />
        <CardContent>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            Word of the Day
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default FeaturedBlog;
