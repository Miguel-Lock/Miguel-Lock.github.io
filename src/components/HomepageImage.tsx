import { Box, IconButton, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

interface HpI {
  source: string;
  target: string;
  bottom_text: string;
}

export default function HomepageImage(props: HpI) {
  return (
    <Box
      sx={{
        position: "relative",
        height: 200,
        my: 2,
        mb: 6,
        display: "block",
        mx: "auto",
        "&:hover .hover-icon": {
          opacity: 1,
        },
      }}
    >
      <Box
        component="img"
        src={props.source}
        sx={{
          height: "100%",
          width: "auto",
          display: "block",
          borderRadius: 2,
        }}
      />
      <IconButton
        component="a"
        href={props.target}
        target="_blank"
        rel="noopener noreferrer"
        className="hover-icon"
        sx={{
          position: "absolute",
          bottom: ".5rem",
          right: ".5rem",
          backgroundColor: "background.paper",
          opacity: 0,
          transition: "opacity 0.3s ease",
          "&:hover": {
            backgroundColor: "primary.main",
          },
        }}
        size="small"
      >
        <OpenInNewIcon sx={{ color: "text.primary", fontSize: "0.9rem" }} />
      </IconButton>
      <Typography sx={{ textAlign: "center", mt: 0.5 }}>
        {props.bottom_text}
      </Typography>
    </Box>
  );
}
