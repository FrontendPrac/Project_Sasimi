// This snippet file was generated by processing the source file:
// ./auth-next/manage.js
//
// To update the snippets in this file, edit the source and then run
// 'npm run snippets'.

// [START auth_delete_user_modular]
// import { handleAuth } from "./login.js";
import {
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js';
import { authService } from '../firebase.js';

export const leave = async (event) => {
  event.preventDefault();
  // const user = authService.currentUser;
  if (
    window.confirm(
      '정말 탈퇴하시겠습니까? 탈퇴 후에도 내가 쓴 게시물은 계속 남아있습니다.'
    )
  ) {
    // They clicked Yes
    console.log('user 탈퇴');

    // 인풋 태그 가져옴
    let userProvidedPassword = document.getElementById('passwordText').value;
    const credential = EmailAuthProvider.credential(
      authService.currentUser.email,
      userProvidedPassword
    );

    const result = await reauthenticateWithCredential(
      authService.currentUser,
      credential
    );

    // Pass result.user here
    await deleteUser(result.user)
      .then(() => {
        console.log('유저 삭제 완료');
        localStorage.removeItem('user');
        window.location.replace('');
      })
      .catch((error) => {
        const errorMessage2 = error.message;
        console.log('error:', errorMessage2);
      });
    // [END auth_delete_user_modular]
  } else {
    // They clicked no
    console.log('탈퇴 취소');
  }
};

// // Prompt the user to enter their email and password
// // const userProvidedPassword = prompt('password: ');
// // const auth = getAuth()
// const credential = EmailAuthProvider.credential(
//     authService.currentUser.email,
//     userProvidedPassword
// )
// const result = await reauthenticateWithCredential(
//     authService.currentUser,
//     credential
// )
// // User successfully reauthenticated. New ID tokens should be valid.

// reauthenticateWithCredential(user, credential).then(() => {
//     // User re-authenticated.
//     deleteUser(result.user).then(() => {
//         // User deleted.

// deleteUser(user).then(() => {
//     // User deleted.

//     console.log("유저 삭제");
//     window.location.replace("");
