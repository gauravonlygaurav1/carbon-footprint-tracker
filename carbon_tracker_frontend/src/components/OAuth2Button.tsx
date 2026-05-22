import { Button } from './ui/button'
import { NavLink } from 'react-router'

function OAuth2Button() {
  return (
    <div className="space-y-3">

            {/* Google */}
            <NavLink to={`${import.meta.env.VITE_API_OAUTH2_URL || 'https://carbon-footprint-tracker-iyh1.onrender.com'
                }/oauth2/authorization/google`}
                className={'block'}>
            <Button type={'button'}
              variant="secondary"
              className="cursor-pointer hover:bg-amber-50 w-full flex items-center justify-center gap-2"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                className="w-4 h-4"
              />
              Continue with Google
            </Button>
            </NavLink>
 
            {/* GitHub */}
            <NavLink to={`${import.meta.env.VITE_API_OAUTH2_URL || 'https://carbon-footprint-tracker-iyh1.onrender.com'
                }/oauth2/authorization/github`} className={'block'}>
                <Button
              variant="secondary"
              className="cursor-pointer hover:bg-amber-50 w-full flex items-center justify-center gap-2"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                alt="github"
                className="w-4 h-4"
              />
              Continue with GitHub
            </Button>
            </NavLink>

          </div>
  )
}

export default OAuth2Button
