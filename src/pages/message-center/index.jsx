import {
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const birthdayMessages = [
    "Birthdays are remarkable milestones that hold deep significance in our lives. They mark the passage of time, serving as a poignant reminder of our journey on this earth. Each birthday is a celebration of existence, a time to reflect on the achievements and growth we have experienced. It is an occasion to express gratitude for the countless blessings, lessons learned, and the love that surrounds us. Birthdays bring together loved ones, creating a space for joy, laughter, and cherished connections. They inspire us to dream big, set new goals, and embrace the future with open arms. Birthdays are the threads that weave the tapestry of our lives, filling it with warmth, memories, and the promise of countless adventures yet to come.",
    "The significance of birthdays cannot be understated. They represent a journey of resilience, learning, and personal transformation. Each passing year adds a new layer of wisdom and experience to our lives. Birthdays provide an opportunity to reflect on the past, celebrating the milestones we have achieved and the challenges we have overcome. They are a time for self-reflection, gratitude, and renewed determination to pursue our dreams. Birthdays also serve as a reminder of the connections we have forged with loved ones, the relationships that have shaped us, and the support we have received throughout the years. They are an occasion to express appreciation for the love, care, and kindness that surrounds us. Birthdays are a beautiful celebration of life and the hope for a bright and fulfilling future.",
    "Birthdays hold immense meaning as they encapsulate the essence of our existence. They are an annual reminder of the miracle of life, a time to honor our individual journeys, and to celebrate the unique qualities that make us who we are. Birthdays invite us to reflect on the experiences and lessons that have shaped us, appreciating both the triumphs and the challenges. They serve as a milestone of personal growth, reminding us of our resilience and capacity for transformation. Birthdays are a testament to the relationships we have nurtured, the bonds that have sustained us, and the love that enriches our lives. They are a time for connection, joy, and gratitude, as we gather with loved ones to celebrate another year of cherished memories and the promise of a future filled with endless possibilities.",
    "A birthday is a precious moment that deserves to be cherished and celebrated. It represents the anniversary of our entry into this world, the day we took our first breath and embarked on our journey of life. Birthdays hold profound significance as they mark the passing of time and serve as milestones of growth, accomplishment, and self-discovery. They offer an opportunity for reflection, allowing us to look back on the lessons learned, the challenges overcome, and the beautiful memories created along the way. Birthdays are a time for gratitude, as we express appreciation for the love, support, and blessings that have shaped our lives. They remind us of the connections we have forged, the friendships that have blossomed, and the profound impact we have had on others. Birthdays are a celebration of our existence and a joyful embrace of the endless possibilities that lie ahead.",
    "Birthdays hold a special place in our hearts as they commemorate the day we entered this world, a day filled with hope, promise, and infinite potential. They are an annual reminder of our unique journey, the experiences that have shaped us, and the person we have become. Birthdays symbolize growth, resilience, and the capacity to overcome challenges. They invite us to reflect on the lessons learned, the achievements attained, and the dreams yet to be realized. Birthdays are a time for celebration, gratitude, and connection. They bring together loved ones, creating a space to share laughter, make cherished memories, and express heartfelt appreciation for the relationships that enrich our lives. Birthdays are a testament to the beauty of life and a celebration of the remarkable individuals we are.",
    "A birthday is a significant milestone that honors the miracle of life and the unique journey each of us undertakes. It represents a moment of reflection, gratitude, and celebration as we mark another year of growth, learning, and experiences. Birthdays are not merely about age but about the accumulation of memories, lessons, and relationships that shape our lives. They remind us to embrace the present, appreciate the past, and eagerly anticipate the future. Birthdays bring together loved ones, creating an atmosphere of joy, laughter, and heartfelt connections. They are a time for celebration, where we express gratitude for the love and support that surrounds us and cherish the milestones we have achieved. Birthdays are a celebration of life, a reminder of our resilience, and a catalyst for dreams yet to be realized.",
    "Birthdays hold a special place in our hearts, representing a unique moment of celebration, reflection, and connection. They mark the anniversary of our birth, symbolizing the beginning of our personal journey through life. Birthdays are more than just a number; they encapsulate the experiences, memories, and growth we have accumulated along the way. They provide an opportunity to appreciate the lessons learned, the accomplishments achieved, and the relationships nurtured. Birthdays bring loved ones together, creating an atmosphere of love, laughter, and shared joy. They are a time for gratitude, as we express appreciation for the blessings in our lives and the support we receive from those we hold dear. Birthdays are a celebration of our existence, a chance to honor our unique stories, and a reminder of the endless possibilities that lie ahead.",
    "A birthday is a significant occasion that holds profound meaning in our lives. It is a day to celebrate our very existence, the journey we have embarked upon, and the person we have become. Birthdays allow us to reflect on the past, to appreciate the present, and to look forward to the future with hope and excitement. They serve as reminders of our growth, resilience, and capacity for love and joy. Birthdays bring people together, fostering connections and creating cherished memories. They are a time for gratitude, as we express appreciation for the blessings and experiences that have shaped us. Birthdays are a celebration of life itself, a testament to our uniqueness, and a reminder to live each day to the fullest.",
    "Birthdays are magical moments that hold immense significance in our lives. They represent the anniversary of our birth, encapsulating the essence of our journey, growth, and personal transformation. Birthdays invite us to reflect on the experiences that have shaped us, the lessons we have learned, and the dreams we hold dear. They are a time for celebration, gratitude, and connection, as we gather with loved ones to honor our existence and share in the joy of another year. Birthdays remind us of the love that surrounds us, the friendships that enrich our lives, and the countless blessings we have received. They are a testament to our resilience, strength, and the infinite possibilities that lie ahead.",
    "Birthdays hold profound significance as they mark the anniversary of our birth and serve as a reminder of our journey through life. They are an occasion for celebration, reflection, and gratitude. Birthdays provide an opportunity to appreciate the milestones achieved, the lessons learned, and the personal growth we have experienced. They bring together loved ones, fostering connections and creating treasured memories. Birthdays symbolize hope, renewal, and the promise of new beginnings. They invite us to embrace the present moment, express gratitude for the blessings in our lives, and envision a future filled with joy, fulfillment, and adventure. Birthdays are a celebration of life's beautiful tapestry, woven with love, laughter, and cherished moments.",
    "Birthdays are moments of profound significance, encapsulating the passage of time and celebrating the unique journey of each individual. They mark the anniversary of our birth, representing a milestone of growth, transformation, and personal accomplishments. Birthdays invite us to reflect on the lessons learned, the relationships nurtured, and the dreams pursued. They provide an opportunity for gratitude, as we appreciate the love and support of those who have touched our lives. Birthdays bring together loved ones, creating cherished memories, and fostering connections. They serve as a reminder to embrace life's blessings, celebrate our existence, and look forward to a future filled with happiness, fulfillment, and endless possibilities.",
    "A birthday is a special occasion that carries deep meaning and significance. It represents the anniversary of our birth, marking the beginning of our personal journey through life. Birthdays are a time for reflection, celebration, and gratitude. They provide an opportunity to look back on the experiences, lessons, and growth we have undergone. Birthdays also serve as a reminder of the connections we have made, the relationships we cherish, and the impact we have had on others. They bring together loved ones, fostering bonds and creating lifelong memories. Birthdays are a celebration of life itself, a tribute to our uniqueness, and a call to embrace the present moment with joy and appreciation.",
  ];
  const navigate = useNavigate();
  return (
    <Grid item container mt={{ xs: 0, md: 4 }}>
      <Grid item sm={9} mx="auto" sx={{}}>
        <List sx={{ width: "100%" }}>
          {birthdayMessages.map((text, idx) => (
            <ListItem alignItems="flex-start" dense sx={{ width: "100%" }}>
              {/* <ListItemButton role={undefined} dense sx={{ mr: 3 }}> */}
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  size="large"
                  // checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  // inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              {/* </ListItemButton> */}
              <ListItemButton
                sx={{ width: "100%" }}
                onClick={() => navigate(`${idx}`, { state: text })}
              >
                <ListItemText
                  primary={text}
                  key={idx}
                  sx={{ width: "100%" }}
                  primaryTypographyProps={{
                    textAlign: "justify",
                    // width: "30%",
                    // maxHeight: "12rem",
                    // overflow: "hidden",
                    // textOverflow: "ellipsis",
                    // whiteSpace: "nowrap",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default Messages;
