import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import * as React from "react";

export default function BlogPost(item) {
  return (
    <Card sx={{ mb: 4, borderRadius: 3 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "rgb(25 118 210)" }}>
            {!!item?.item?.title?.length && item.item.title[0]}
          </Avatar>
        }
        title={<b>{item.item.title}</b>}
        subheader={item.item.publishedAt}
      />

      <a
        style={{ textDecoration: "none" }}
        target="_blank"
        href={item.item.url}
      >
        <img src={item.item.urlToImage} style={{ width: "100%" }} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {item.item.description}
          </Typography>
        </CardContent>
      </a>

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <i>Author by: </i> &nbsp;{" "}
        <b style={{ color: "rgb(25 118 210)" }}>
          <i> {item.item.author}</i>{" "}
        </b>
      </CardActions>
    </Card>
  );
}
