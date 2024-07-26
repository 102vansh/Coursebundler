import { Grid, Heading, HStack, Stack } from '@chakra-ui/react'
import React from 'react'
import Sidebar from './Sidebar'
import { Box } from '@chakra-ui/react'
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri'
import { Text } from '@chakra-ui/react'
import { Progress } from '@chakra-ui/react'
import { Line } from 'react-chartjs-2'
import { DoughnutChart, LineChart } from './Chart'
import { dashboard } from '../../redux/reducer/admin'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
const Databox = ({title, qty, qtyPercent, profit}) => {
    
    return (
        <Box
        w={['full', '20%']}
        boxShadow={'-2px 0px 13px -5px rgba(0,0,0,0.75)'}
        p={'8'}
        borderRadius={'lg'}
        textAlign={'center'}
        >
        <Text fontSize={'2xl'} fontWeight={'bold'} children={title} />
        <HStack>
            <Text fontSize={'2xl'} fontWeight={'bold'} children={qty} />
            <HStack>
            <Text children={`${qtyPercent}%`} />
            {profit?(<RiArrowUpLine color='green' />):(<RiArrowDownLine color='red' />)}
        </HStack>
        </HStack>
        <Text opacity={'0.2'} children={'Since last month'} />
        </Box>
    )
}
const Bar = ({title, value, profit}) => (
    <Box py={'4'}>
        <Heading size={'sm'} children={title} mb={'2'} opacity={'0.4'} />
        <HStack w={"full"}  alignItems={'center'}>
<Text children={profit? '0%' : `-${value}%`}></Text>
<Progress w={'full'} colorScheme='purple' value={value} />
<Text children={`${value>100? value : '100'}%`}></Text>
        </HStack>
    </Box>
)



const Dashboard = () => {
    const{loading,stats,viewcount,subscribecount,usercount,subscriptionpercentage,viewspercentage,userpercentage,subscriptionprofit,viewsprofit,userprofit} = useSelector(state => state.admin)
const dispatch = useDispatch()
    useEffect(() => {
dispatch(dashboard())
    }, [])
  return (
    <Grid 

     minH={"100vh"} templateColumns={["1fr", "5fr 1fr"]}>
<Box boxSizing='border-box' py={'16'} px={["4","1"]}>
    <Text textAlign={"center"} fontWeight={"bold"} opacity={"0.5"} children={`Last change was on ${String(new Date()).split("G")[0]}`}></Text>
    <Heading mt={"19"} textAlign={"center"} children="Admin Dashboard" ml={['center','left']} />
    <Stack mt={"8"}
    direction={['column','row']}
    minH={"24"}
    spacing={'20'}
    justifyContent={'center'} ml={['0','16']}>
        <Databox title='views' qty={viewcount} qtyPercent={viewspercentage} profit={viewsprofit} />
        <Databox title='Users' qty={usercount} qtyPercent={userpercentage} profit={userprofit} />
        <Databox title='subscriptions' qty={subscribecount} qtyPercent={subscriptionpercentage} profit={subscriptionprofit} />
    </Stack>

    <Box m={["0","16 "]} borderRadius={"lg"} p={"4"} boxShadow={'-2px 0px 13px -5px rgba(0,0,0,0.75)'}>
        <Heading textAlign={"center"} pb={"4"} children="Views Graph" pt={"4"} size={"lg"} ml={['0','16']}/>
        <LineChart/>
       
    </Box>
    <Grid templateColumns={['1fr', '2fr 1fr']}>
<Box p={'4'}>
    <Heading textAlign={"center"} children="Progress Bar" my={"8"} ml={['0','16']}  />
    <Box ml={['0','16']}>
        <Bar profit={viewsprofit} title ="Views" value={viewspercentage} />
        <Bar profit={userprofit} title ="Users" value={userpercentage} />
        <Bar profit={subscriptionprofit} title ="Subscriptions" value={subscriptionpercentage} />
    </Box>
</Box>
<DoughnutChart users = {[subscribecount,usercount-subscribecount]} />
    </Grid>
</Box>

<Sidebar/>
    </Grid>
  )
}

export default Dashboard