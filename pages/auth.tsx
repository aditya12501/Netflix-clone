
import { useCallback, useState } from 'react';
import Input from '../components/Input';
import axios from 'axios';
import {getSession, signIn} from 'next-auth/react';

import {FcGoogle} from 'react-icons/fc';
import {FaGithub} from 'react-icons/fa';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    if (session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }

    return {
      props: {}
    }
  }
const Auth = () => {
    const router = useRouter();
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [password,setPassword]= useState('');

    const [variant,setVariant] = useState('login');

    const toggleVariant = useCallback(()=>{
        setVariant((currValue) => currValue === 'login' ? 'register' : 'login' );
    },[]);

    const login =useCallback(async () => {
        try {
            await signIn('credentials',{
                email,
                password,
                redirect:false,
                callbackUrl:'/',
            });
            router.push('/profiles')


        } catch (error) {
            console.log(error);

        }

    },[email,password,router]);



    const register = useCallback(async()=> {
        try {
            axios.post('/api/register',{email,password,name})
            login();
        } catch (error) {
            console.log(error);

        }
    },[email,name,password,login]);




  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover " >
        <div className="bg-black w-full h-full lg:bg-opacity-50" >
            <nav className="py-5 px-12" >
                <img alt='Nice' src="/images/logo.png" className="h-12" />
            </nav>
            <div className="flex  justify-center">
                <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full ">
                    <h2 className="text-white text-4xl mb-8 font-semibold">
                        {variant === 'login' ? 'Sign in' : 'Register'}
                    </h2>
                    <div className="flex flex-col gap-4">
                        {variant === 'register' && (<Input
                        lable='Username'
                        onChange={(e:any)=>setName(e.target.value)}
                        id='name'
                        value={name}
                         />) }

                    <Input
                        lable='Email'
                        onChange={(e:any)=>setEmail(e.target.value)}
                        id='email'
                        type='email'
                        value={email}
                         />
                    <Input
                        lable='Password'
                        onChange={(e:any)=>setPassword(e.target.value)}
                        id='password'
                        type='password'
                        value={password}
                         />
                    </div>
                    <button onClick={ variant === 'login'? login : register} className='bg-red-600 w-full py-3 text-white rounded-md mt-10 hover:bg-red-700 transition
                     ' >
                        {variant === 'login'? 'Login':'Sign up'}
                    </button>
                    <div className='flex flex-row items-center gap-4 mt-8 justify-center'>
                        <div onClick={()=>signIn('google',{callbackUrl:'/profiles'})} className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'>
                            <FcGoogle size={30}  />
                        </div>
                        <div onClick={()=>signIn('github',{callbackUrl:'https://myxo1app.vercel.app/profiles'})} className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'>
                            <FaGithub size={30}  />
                        </div>

                    </div>
                    <p className='text-neutral-500 mt-12' >{ variant === 'login'? 'First time using NetfliX?' : 'Already have an account' }
                    <span onClick={toggleVariant} className='text-white ml-1 hover:underline cursor-pointer' >{ variant === 'login'? 'Create an account' : 'Sign in' }</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Auth;