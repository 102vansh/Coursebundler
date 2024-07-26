// src/PaymentFailed.js
import React from 'react';
import { Box, Heading, Text, Button, Container, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Paymentfail = () => {
  return (
    <Container centerContent py={10}>
      <VStack mt={40} spacing={8} boxShadow="lg" borderRadius="lg" p={8} bg="red.50">
        <Heading color="red.600">Payment Failed</Heading>
        <Text color="red.500" fontSize="lg">
          Unfortunately, your payment could not be processed.
        </Text>
        <Text color="gray.500">
          Please try again or contact our support team for assistance.
        </Text>
        <Button as={Link} to="/retry-payment" colorScheme="red" size="lg">
          Retry Payment
        </Button>
        <Button as={Link} to="/support" colorScheme="gray" size="lg" variant="outline">
          Contact Support
        </Button>
      </VStack>
    </Container>
  );
};

export default Paymentfail;
