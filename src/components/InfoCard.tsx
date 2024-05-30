import { Star } from "@mui/icons-material";
import {
  Card,
  CardMedia,
  CardContent,
  Stack,
  Chip,
  useTheme,
  styled,
  css,
} from "@mui/material";
import { getImageUrl, stripHtmlTags, truncateText } from "../utils/helpers";
import CardImage from "./CardImage";
import { Text } from "./Typography";

type InfoCardProps = {
  title: string;
  description: string;
  image: string;
  rating?: number | null;
  hasAction?: boolean;
};

const StyledCard = styled(Card)`
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows[4]};
  }
`;

const StyledMedia = styled(CardImage)(
  ({ theme: { breakpoints } }) => css`
    height: 200px;
    height: 100%;

    ${breakpoints.up("sm")} {
      height: 350px;
    }
  `
) as typeof CardMedia;

function InfoCard({
  title,
  description,
  image,
  rating,
  hasAction = false,
}: InfoCardProps) {
  const { palette } = useTheme();
  const imageUrl = getImageUrl(image, title);
  const Wrapper = hasAction ? StyledCard : Card;

  const formatText = (text: string) => {
    return text ? truncateText(stripHtmlTags(text), 80) : "";
  };

  return (
    <Wrapper elevation={1}>
      <StyledMedia
        component="img"
        image={imageUrl}
        alt={`image for ${title}`}
      />
      <CardContent>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent={{ xs: "flex-start", sm: "space-between" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          mb={description ? 3 : 0}
        >
          <Text>{title}</Text>
          {rating ? (
            <Chip
              variant="outlined"
              icon={<Star sx={{ fill: palette.yellow.main }} />}
              label={rating}
            />
          ) : null}
        </Stack>

        {description ? <Text>{formatText(description)}</Text> : null}
      </CardContent>
    </Wrapper>
  );
}
InfoCard.displayName = "InfoCard";

export default InfoCard;
