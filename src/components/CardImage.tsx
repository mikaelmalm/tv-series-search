import { Box, CardMedia, CardMediaProps, Skeleton } from "@mui/material";
import { useState } from "react";

// This is a custom image component that shows a skeleton loader while the image is loading
// This improves the user experience for users with a slower internet connection
function CardImage(props: CardMediaProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={props.className}>
      <Box display={loaded ? "block" : "none"}>
        <CardMedia {...props} onLoad={() => setLoaded(true)} />
      </Box>
      {!loaded && <Skeleton variant="rectangular" width="100%" height="100%" />}
    </div>
  );
}

CardImage.displayName = "CardImage";

export default CardImage;
