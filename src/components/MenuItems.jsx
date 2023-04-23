import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
// user logout, remove token from cookies

function MenuItems () {
  return [
    {
      key: '1',
      icon: <FontAwesomeIcon icon={faHouse}/>,
      label: 'Home',
      path: '/home',
      onClick: '',
      onlyMaker: false,
      onlyConsumer: false,
    },
    {
      key: '2',
      icon: <FontAwesomeIcon icon={faRightFromBracket}/>,
      label: 'Post Job',
      path: '/jobform',
      onClick: '',
      onlyMaker: false,
      onlyConsumer: false,
    },
    {
      key: '3',
      icon: <FontAwesomeIcon icon={faRightFromBracket}/>,
      label: 'Available Jobs',
      path: '/jobs',
      onClick: '',
      onlyMaker: true,
      onlyConsumer: false,
    },
    {
      key: '4',
      icon: <FontAwesomeIcon icon={faRightFromBracket}/>,
      label: 'My Jobs',
      path: '/myjobs',
      onClick: '',
      onlyMaker: false,
      onlyConsumer: true,
    },
  ];
}

export default MenuItems
