import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";

const FeaturedBlog = ({ blogItem }) => {
  const { title, image, createdBy, createdAt } = blogItem;
  const postedDate = new Date(createdAt).toLocaleDateString({
    year: "numaric",
    month: "short",
    day: "numaric",
  });
  return (
    <div>
      <Card sx={{ maxWidth: 345, height: "100%" }}>
        <CardHeader
          avatar={
            <CardMedia
              style={{ width: "50px", borderRadius: 50 }}
              component="img"
              image={
                createdBy?.userPhoto
                  ? createdBy.userPhoto
                  : `https://ui-avatars.com/api/?length=1&name=${createdBy.userName}&bold=true&background=random`
              }
              alt="User Image"
            />
          }
          action={<IconButton aria-label="settings"></IconButton>}
          title={createdBy?.userName}
          subheader={postedDate}
        />
        <CardMedia
          style={{ height: 200 }}
          component="img"
          image={image}
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
            {title}
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
