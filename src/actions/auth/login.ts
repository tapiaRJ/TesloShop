
'use server';
 
import { signIn } from '@/src/auth.config';
import { AuthError } from 'next-auth';
 
// ...
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,

) {
  try {
    
    console.log(formData)
    await signIn('credentials', formData);

    //return 'Success';
    
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Algo salio mal.';
      }
    }
    throw error;
  }



}

