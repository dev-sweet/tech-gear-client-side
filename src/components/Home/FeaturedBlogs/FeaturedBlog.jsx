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
import { motion } from "framer-motion";
import { useRef } from "react";
const FeaturedBlog = ({ blogItem, index }) => {
  const scrollRef = useRef();
  const { title, image, createdBy, createdAt } = blogItem;
  const postedDate = new Date(createdAt).toLocaleDateString({
    year: "numaric",
    month: "short",
    day: "numaric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 60 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ root: scrollRef }}
      transition={{ duration: 0.8, delay: 0.3 * index }}
      animate={{ opacity: 1, y: 0 }}
    >
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
    </motion.div>
  );
};

export default FeaturedBlog;
