import {
  Card,
  CardBody,
  Input,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
// import { Search2Icon } from '@chakra-ui/icons';

const Search = ({ setSearch, handleSearch }) => {
  return (
    <div>
      <Card mb={5}>
        <CardBody>
          <Grid templateColumns="repeat(4, 1fr)" gap={2}>
            <GridItem colSpan={3}>
              <Input
                variant="filled"
                placeholder="Type Something"
                onChange={(e) => setSearch(e.target.value)}
              />
            </GridItem>
            <GridItem colStart={4} colEnd={5}>
              <Button colorScheme="blue" onClick={handleSearch}>
                Search
              </Button>
            </GridItem>
            {/* <GridItem colSpan={'3'} h='10' bg='tomato' />
                    <GridItem colStart={4} colEnd={4} h='10' bg='papayawhip' /> */}
          </Grid>
        </CardBody>
      </Card>
    </div>
  );
};

export default Search;
