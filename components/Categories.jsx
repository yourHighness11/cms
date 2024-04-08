import { Card, CardBody, ListItem, List, Center } from "@chakra-ui/react";
const Categories = ({ handleSubmit }) => {
  return (
    <div>
      <Card>
        <CardBody>
          <Center fontSize={"2xl"}>Categories</Center>
          <List
            style={{ cursor: "pointer" }}
            mt={5}
            fontSize={"1rem"}
            spacing={3}
            onClick={handleSubmit}
          >
            <ListItem>Finance</ListItem>
            <ListItem>Technology</ListItem>
            <ListItem>Events</ListItem>
            <ListItem>Marketing</ListItem>
            <ListItem>Health</ListItem>
            <ListItem>Science</ListItem>
            <ListItem>Business</ListItem>
            <ListItem>Sports</ListItem>
          </List>
        </CardBody>
      </Card>
    </div>
  );
};

export default Categories;
