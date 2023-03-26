import {Box,Typography,Rating} from '@mui/material'
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';


export default function DP() {

  const {user} = useSelector((state:RootState)=>state.users)
  
  return (
      <Box 
            sx={{display:'flex',flexDirection:'column',
                alignItems:'center',justifyContent:'center',
                padding:'.5rem 1rem'
            }}
        >
        <Avatar  src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAH4AfgMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAFBgIDBAABB//EADYQAAEDAwMCBQAIBgMBAAAAAAEAAgMEESEFEjFBUQYTImFxFCMyQoGRobEzUmLB0fAkcuEV/8QAGQEAAwEBAQAAAAAAAAAAAAAAAQIDBAAF/8QAHxEBAQACAwACAwAAAAAAAAAAAAECEQMhMRJBEzJh/9oADAMBAAIRAxEAPwBZsvVIhcAmBGy48KYwg+q6ha8ML7E4LgM/AXOW12pMhPlxu3PHQHhDJKqSUl75cfyi2FSylJHmSnB+6M3/AMqubymttZ3wCltHSc9a/wAvYx9xfkFVs2geouJPIblV00QkLgGkY/FQjeGOs9uBgrtjoRZNCxoG54PUubx+S8lkDm4d1w4G4UGyt2jYHfH+hRBY93O1x7D+yOx02Ueqvpj5dRcs6OGbI9BKydgewgg8EHlKcjdpsRdqlp1a/T6i1y6BxyD0910KbSor1j2yMa9jgWOyCOq4oggV1l6V6AucnZcGqS8JDWknoucxalUCGB1jk4CBNDYz5k32+bWw3591p1WqvKQD9i/HQoPJK4jc/g8N7pbRXzVDpOpa3oOpVcMEtY/ZE0nuTwvaCnNXUBvJ7WX0LQtJhgibdgLvccKWeel+Li+XoBpfhyRrd5OfZe1nhx0ri7a4HuAvotPSAtsG4Wg0TLWICn8smj8WL4tU6ZW0byYyXN7HKrYWTja9m2T9Cvqmo6Qx7SQ0JI13SPKJfG31Dsnx5LvVTz4ZrcAWSOjIZJcs9zlQnbvJyeeey6d147dQoRS727Xc2/MKzKL6DX+UfosxuD9g9EfNikjeY5A5ptY3B7Js06qFRTtdb1WyjAaSuC5cEQXLLqc/0elc7h1sLbZL/iWezmxDpk/7+CFEIlIJAccfad8LNL6iP5ncDsFY85tfs35XU0fnVrGfqElvRpN9GnwvpTWtErhdxTtSRhpFgg+jRBsbQTtDRklH6Wai3AGpiv23hZu6346xmhSmw3hWve0KDfLDR5cjHX7G6qlc09UfBnaqdwIKWNaia4Px0TJI5u3lCNQga9pJLc9ygZ8r1Rhp6t2PQcj+6ysjDj6Dm1wmbxPppETpAAS3NglNkhYbtOQb39lowvTDy46yXk3PY9fZFfD1QBKYXmwOR8oTuEuW+l3b/Cu02Xy65ocBZ2Pgp4icybrmryMDYO9lKyYGm1kn63IZK5ziMcpuqjaF3vhJWozeZPI8Ws03/DohRjIXer4/dbvDjPO1C54FkMN7E3R/wfFvmkt3Us/FePvKGd0NMTvrZHOaOI2u2gf5VclJp9S3/iOkjI6tJd+aq1fSKryS6GQd8i6wzaTVyU9O+gqB54a4TtqJC1ueC23ZJjN/bRnZPrbRBNW0E/1dTvjBsRfhNVFqDqiIO5xyEsUGlTxNpmTVPnyn+PvdgZ5a7k46H9E1aBpzY55Iw7cz7qnnNVXj8CtZ1mSFrooDaQnB7IAKetrZL1NWW3ztBzZGNQoWv1iXeRZowLgXPRZNV0qsdQtdQ1EbZi4iSLzCGbCLD1DJcCjhO/Scl/gbqVFTwxOb9JkfIP6+vwlCRpZJb3Rmp0+qhgibJK985c7e0kkDtYoZWwPgeBIPUrY9fbNydzzSg4NwfhaGvMgDxiQdlmvgK6MjbhOicdJqDU0rHm2f3C3pZ0KZ0dQYmnD7EfKZm5CeAjrEoipHuOMWHykqU7rg/eJTX4mcBSBv9SUZHWce4alvporDd0XyUxeCjsqZGu7goDe1MMXsCUd0KZgniLCL7Tut3wp5+K8f7bfUaSGOohDHNBBCqk8L05dcGQewcQFVotW0taCcphZWx7LOtdQbtAv/AMaCihJDM91PRwfpbrdAVPVK3zLMZxe11ZoTWNlfvkZuAzlCmk6LtW0DVHlwvm2VudodNUxB8bdt+dpI/ZYde2itvDIwkXJsUY0+rAhbY9ENhYB1WiwUp3nc5w43OukPxU1oluB1X0vWJ2ujORgL5n4ie18waE/H6lzSTABUgbLzqQVy0vPb9JfavhufvWTwxuEgUbiyqicOQ4FfQYJGvjDm9Rx2TwKweJA18bI25IBclCZt5iAE6alZ9a9tuYi0fkUqbbVFz3t+qWmjLL9XGGHoFo0Wd0dZSC42uc9p/wB/FZ6zMrv+xH6BZYpnxvjeDmN25o97/wDiWml1X0ekrJKd4GUapq6Sewbf3N0ApJo6iBkjSC0gEFEWyObCRS2MxFm3NhdQsb8cjBJTtqaZ0Y3Bx+805B7pZrNH1SjDnwVhkvyJCr6XVdTYRGKAve3na8H9lfUa5UMbtl054+WPBuumFPLsuU2kV89UJK2pc0X4YeU2mojhhDWj7Isl+o1fUZbvGnuAAz6HC34rJDqNZWzCJkRjA+2SUuWFLv4turakNjgCkTUpy+Uu7pk1jbG0C/q6pSrXbpdo6KnHGfny+lYv+KsDb/gFFgyFdazrd22V2RGJ3lzMd8J9oC2aBskRs1wBXz5xzYpn8L6m1kT6eciw9Tc5RxCiuo+lxnPLSQQlaTLx33Jv11m2F0jeHYcEnNN5ozzm66jFNWPrSP6iT+awOFiiMnqke4ZHdYZBlKNF/D+oSQymmcbxkFzfY9U30EwcbgpB0p23UYCeCSE4SRPp/rqfI5c1Sz9aeHK6GahkpImgcWvHZcPE+q08flzCVw6ODQVDSdWglFpMHqCjzJaBzPstvbqpzKxqxu/CjX6xX6gNrmSBvFyLLPGfocLnHDiMlMGrVVJDGXAsSNq2puqnlsWGhdu5UnJl8fWXVa8vcc3J49kLDSX98Lpjd1yvWHk+y0YzUYM8rlUxbdhTYdzj+f5qvuVZHix74TFVTCzl7G7b1/JTnHqv0VbeFzn0TWJAad7Gep+0m3bHVJTCG2cODgf3RfU63bG5jG2Jz7IUY7EDs0WRroqdiL5yVhkOSiM4wG/03Q52XFK6vYiY54Xjm919Ao5BNTtv1CQ3M9TL/wAictDJdSsPWynyNHAoq6W0lxcHuFjkqKyIWbM63umGpiBFyhtTC2yRbWvASZ09QbSSOd8lV1FOYob2RSGEGUBdq7LRBo4RlLceizIzCjELlapmBrBZUM+0rTxly9WNb6Xeylt+pBU4hfzB7H9wub/BN+AiVVKQ5qpsWqy1iR2K9jbyOy5z/9k='>
        H
        </Avatar>
        <Typography variant='caption'>{user && user.email}</Typography>
        <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Typography sx={{fontWeight:'bold'}} variant='caption'>SMNK_ID:  </Typography>
            <Typography variant='caption'>{user && user._id}</Typography>
        </Box>
        <Rating name="read-only" value={3} readOnly />
      </Box>
      
  );
}