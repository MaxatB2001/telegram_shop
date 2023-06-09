import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Text, Heading, Divider, ButtonGroup } from '@chakra-ui/react'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'

const Product = ({product}) => {
  const navigate = useNavigate()
  return (
    <Card style={{cursor: "pointer"}} onClick={() => navigate("product")} maxW={"45%"}>
      <CardBody>
        <Image boxSize={"150px"} objectFit={'contain'} src={`http://localhost:5000/${product.picture}`} borderRadius='lg'/>
        <Stack mt='3' spacing='1'>
        <Heading size='sm'>{product.name}</Heading>
        <Text color='blue.600' fontSize='md'>
         {product.cost}р
      </Text>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default Product