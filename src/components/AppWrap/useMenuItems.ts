import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';

const useMenuItems = () => {
  const items = [
    {
      name: 'feed',
      label: 'feed',
      icon: HomeIcon,
      pathname: '/',
    },
    {
      name: 'explore',
      label: 'explorar',
      icon: PeopleIcon,
      pathname: '/explorar',
    },
    {
      name: 'profile',
      label: 'perfil',
      icon: PersonIcon,
      pathname: '/perfil',
    },
  ];

  return items;
};

export default useMenuItems;
