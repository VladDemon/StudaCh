import { FC } from 'react'
import { Link } from 'react-router-dom'

interface SideMenuItemProps {
  title: string;
  path: string;
  favic: JSX.Element
  isLogged: boolean
}

const SideMenuItem: FC<SideMenuItemProps> = ({title, path, favic}) => {
  return (
  <div className='FavItem'>
        <Link className='menuItem' to={path}>
          {favic}<h1>{title}</h1>
        </Link>
  </div>)
}

export default SideMenuItem