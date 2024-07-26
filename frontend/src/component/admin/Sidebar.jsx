// // import { Button, VStack } from '@chakra-ui/react'
// // import React from 'react'
// // import { RiUser3Fill } from 'react-icons/ri'
// // import { RiAddCircleFill, RiDashboardFill, RiEyeFill } from 'react-icons/ri'
// // import { Link, useLocation } from 'react-router-dom'

// // const Sidebar = () => {
// //     const location = useLocation()
// //   return (
// //     <VStack spacing={8} boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}>
    
// //     <Linkbutton mt={10} active={location.pathname==='/admin/dashboard'} url={'dashboad'} Icon={RiDashboardFill} text={'Dashboard'}/>
// //     <Linkbutton active={location.pathname==='/admin/courses'} url={'courses'} Icon={RiEyeFill} text={'Courses'}/>
// //     <Linkbutton active={location.pathname==='/admin/users'} url={'users'} Icon={RiUser3Fill} text={'Users'}/>
// //     <Linkbutton active={location.pathname==='/admin/createcourses'} url={'createcourse'} Icon={RiAddCircleFill} text={'Createcourse'}/>

// //     </VStack>
// //   )
// // }

// // export default Sidebar

// // function Linkbutton({url,Icon,text,active}){
// //     return(
// //         <Link to={`/admin/${url}`}><Button colorScheme={active?'blue':''} fontSize={'larger'}><Icon style={{margin:4}}/>{text}</Button></Link>
// //     )
// // }
// import { Button, VStack } from '@chakra-ui/react';
// import React from 'react';
// import { RiUser3Fill, RiAddCircleFill, RiDashboardFill, RiEyeFill } from 'react-icons/ri';
// import { Link, useLocation } from 'react-router-dom';

// const Sidebar = () => {
//   const location = useLocation();
//   return (
//     <VStack spacing={8} boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'} p={4}>
//       <LinkButton
//         mt={10}
//         active={location.pathname === '/admin/dashboard'}
//         url={'dashboard'}
//         Icon={RiDashboardFill}
//         text={'Dashboard'}
//       />
//       <LinkButton
//         active={location.pathname === '/admin/courses'}
//         url={'courses'}
//         Icon={RiEyeFill}
//         text={'Courses'}
//       />
//       <LinkButton
//         active={location.pathname === '/admin/users'}
//         url={'users'}
//         Icon={RiUser3Fill}
//         text={'Users'}
//       />
//       <LinkButton
//         active={location.pathname === '/admin/createcourse'}
//         url={'createcourses'}
//         Icon={RiAddCircleFill}
//         text={'Create Course'}
//       />
//     </VStack>
//   );
// };

// export default Sidebar;

// function LinkButton({ url, Icon, text, active }) {
//   return (
//     <Link to={`/admin/${url}`}>
//       <Button colorScheme={active ? 'blue' : ''} fontSize={'larger'}>
//         <Icon style={{ margin: 4 }} />
//         {text}
//       </Button>
//     </Link>
//   );
// }
import { Button, VStack } from '@chakra-ui/react';
import React from 'react';
import { RiUser3Fill, RiAddCircleFill, RiDashboardFill, RiEyeFill } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  console.log(location.pathname); // Debugging statement to see the current path
  return (
    <VStack spacing={5} boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'} p={4} >
      <LinkButton 
      
        active={location.pathname === '/admin/dashboard'}
        url={'dashboard'}
        Icon={RiDashboardFill}
        text={'Dashboard'}
      />
      <LinkButton
        active={location.pathname === '/admin/courses'}
        url={'courses'}
        Icon={RiEyeFill}
        text={'Courses'}
      />
      <LinkButton
        active={location.pathname === '/admin/users'}
        url={'users'}
        Icon={RiUser3Fill}
        text={'Users'}
      />
      <LinkButton
        active={location.pathname === '/admin/createcourses'}
        url={'createcourses'}
        Icon={RiAddCircleFill}
        text={'Create Course'}
      />
    </VStack>
  );
};

export default Sidebar;

function LinkButton({ url, Icon, text, active }) {
  console.log(url, active); // Debugging statement to see if LinkButton is rendering correctly
  return (
    <Link to={`/admin/${url}`}>
      <Button variant={'ghost'} colorScheme={active ? 'blue' : 'gray'} fontSize={'larger'} w="full" justifyContent="flex-start">
        <Icon style={{ marginRight: 4 }} />
        {text}
      </Button>
    </Link>
  );
}
