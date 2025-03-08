import React from 'react'
import{ColorModeSwitcher} from '../../ColorModeSwitcher'
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, useDisclosure, VStack, Box, Badge, keyframes, useColorModeValue } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill, RiRobotLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { logoutuser } from '../../redux/actions/user'

// Define pulse animation keyframes
const pulseKeyframes = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(159, 122, 234, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(159, 122, 234, 0); }
  100% { box-shadow: 0 0 0 0 rgba(159, 122, 234, 0); }
`;

const Header = ({isAuthenticated,user}) => {
  
  const dispatch = useDispatch()
  const logouthandler=()=>{
    console.log('logout')
    dispatch(logoutuser())
    onClose()
  }

  const{isOpen,onOpen,onClose} = useDisclosure()
  const pulseAnimation = `${pulseKeyframes} 2s infinite`;
  const gradientBg = useColorModeValue(
    'linear(to-r, purple.400, pink.400)', 
    'linear(to-r, purple.600, pink.600)'
  );
  
  const LinkButton = ({url='/',title = 'Home',onClose, isNewFeature}) => {
    if (isNewFeature) {
      return (
        <Link onClick={onClose} to={url}>
          <Box 
            position="relative" 
            animation={pulseAnimation} 
            borderRadius="md"
            mb={2}
          >
            <Button 
              variant={'solid'} 
              bgGradient={gradientBg}
              color="white"
              _hover={{ 
                transform: 'translateY(-2px)', 
                boxShadow: 'lg' 
              }}
              leftIcon={<RiRobotLine />}
            >
              {title}
              <Badge 
                ml={2} 
                colorScheme="yellow" 
                fontSize="0.7em"
                transform="rotate(3deg)"
              >
                NEW
              </Badge>
            </Button>
          </Box>
        </Link>
      )
    }
    
    return (
      <Link onClick={onClose} to={url}>
        <Button variant={'ghost'} colorScheme={'yellow'}>{title}</Button>
      </Link>
    )
  }
  
  return (
    <div>
      <ColorModeSwitcher/>
      <Button onClick={onOpen} colorScheme={'yellow'} width={'12'} height={'10'} rounded={'full'} position={'fixed'} top={'6'} left={'6'} >
        <RiMenu5Fill/>
      </Button>
      <Drawer onClose={onClose} placement='left' isOpen={isOpen} >
        <DrawerOverlay backdropFilter={'blur(1.5px)'} />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={'1px'} >COURSE BUNDLER</DrawerHeader>
          <DrawerBody>
            <VStack spacing={'4'} alignItems={'flex-start'}>
              <LinkButton onClose={onClose} url='/' title='Home'></LinkButton>
              <LinkButton onClose={onClose} url='/courses' title=' Browse All Courses'></LinkButton>
              <LinkButton onClose={onClose} url='/request' title='Request courses'></LinkButton>
              <LinkButton onClose={onClose} url='/contact' title='Contactus'></LinkButton>
              <LinkButton onClose={onClose} url='/about' title='About'></LinkButton>
              <LinkButton onClose={onClose} url='/quiz' title='AI Quiz' isNewFeature={true}></LinkButton>
              <LinkButton onClose={onClose} url='/codeeditor' title='codeeditor' isNewFeature={true}></LinkButton>
              <LinkButton onClose={onClose} url='/mockint' title='mockinterview' isNewFeature={true}></LinkButton>
              <HStack justifyContent={'space-evenly'} position={'absolute'} bottom={'2rem'} width={'80%'}>
                {isAuthenticated ? (
                  <>
                    <VStack display={'flex'}>
                      <HStack spacing={'4'} mb={'4'}>
                        <Link to={'/profile'}><Button colorScheme={'yellow'}>Profile</Button></Link>
                        <Link to={'/'}><Button onClick={logouthandler} colorScheme={'yellow'}><RiLogoutBoxLine/>Logout</Button></Link>
                      </HStack>
                      {user && user.role === 'admin' && (
                        <Link onClick={onClose} to={'/admin/dashboard'}>
                          <Button   colorScheme={'pink'}><RiDashboardFill style={{margin:'5px'}}/>
                          Dashboard</Button>
                        </Link>
                      )}
                    </VStack>
                  </>
                ) : (
                  <>
                    <Link onClick={onClose} to={'/login'}><Button colorScheme={'yellow'}>Login</Button></Link>
                    <p>OR</p>
                    <Link onClick={onClose} to={'/register'}><Button  colorScheme={'yellow'}>Sign Up</Button></Link>
                  </>
                )}
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default Header