import React from 'react'
import{ColorModeSwitcher} from '../../ColorModeSwitcher'
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, useDisclosure, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { logoutuser } from '../../redux/actions/user'

const Header = ({isAuthenticated,user}) => {
  
  const dispatch = useDispatch()
  const logouthandler=()=>{
    console.log('logout')
dispatch(logoutuser())
    onClose()
  }

  const{isOpen,onOpen,onClose} = useDisclosure()
  const LinkButton = ({url='/',title = 'Home',onClose}) => {
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
       <DrawerHeader borderBottomWidth={'1px'} >    COURSE BUNDLER</DrawerHeader>
          <DrawerBody>
            <VStack spacing={'4'} alignItems={'flex-start'}>
              <LinkButton onClose={onClose} url='/' title='Home'></LinkButton>
              <LinkButton onClose={onClose} url='/courses' title=' Browse All Courses'></LinkButton>
              <LinkButton onClose={onClose} url='/request' title='Request courses'></LinkButton>
              <LinkButton onClose={onClose} url='/contact' title='Contactus'></LinkButton>
              <LinkButton onClose={onClose} url='/about' title='About'></LinkButton>
              <HStack justifyContent={'space-evenly'} position={'absolute'} bottom={'2rem'} width={'80%'}>
{isAuthenticated?(<>
<VStack display={'flex'}>
<HStack spacing={'4'} mb={'4'}>

  
  <Link to={'/profile'}><Button colorScheme={'yellow'}>Profile</Button></Link>
<Link to={'/'}><Button onClick={logouthandler} colorScheme={'yellow'}><RiLogoutBoxLine/>Logout</Button></Link>



  
</HStack>
{
  user && user.role === 'admin' && (
    

    <Link onClick={onClose} to={'/admin/dashboard'}>
      <Button   colorScheme={'pink'}><RiDashboardFill style={{margin:'5px'}}/>
      Dashboard</Button>
    </Link>
  )
}
</VStack>
</>):(<>
<Link onClick={onClose} to={'/login'}><Button colorScheme={'yellow'}>Login</Button></Link>
<p>OR</p>
<Link onClick={onClose} to={'/register'}><Button  colorScheme={'yellow'}>Sign Up</Button></Link>
</>)}
              </HStack>
            </VStack>

          </DrawerBody>
        </DrawerContent>
      </Drawer>

      
    </div>
  )
}

export default Header