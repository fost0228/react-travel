import React from "react";
import { UserLayout } from "../../../layouts/userLayout";
import { SignInForm } from "./SignInForm";
export const SignInPage = (props) => {
  return (
    <UserLayout>
      <SignInForm />
    </UserLayout>
  );
};

// export const SignInPage =()=> {
//   return (
//     <div>
//       <h1>Sign In Page</h1>
//     </div>
//   )
// }

// import React from 'react'

// export const SignInPage: React.FC =() => {
//   return (
//     <div>
//       <h1>Sign In Page</h1>
//     </div>
//   )
// }
