import { Container, Text } from "@chakra-ui/react";

const Profile = ({ userName }) => {
  return (
    <div style={{marginTop:'5rem'}} >
      <Text m={10} textAlign={'center'} fontSize={"3xl"} alignItems={'center'}>Welcome to your profile <Text as={'b'}>{userName}</Text>.</Text>
    </div>
  );
};

export default Profile;
