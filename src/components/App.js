import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false); // firebase 의 초기화 대기
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // setUserObj(user);
        // 가져오는 userObj 의 크기가 너무 커서 성공적으로 값을 변경해도
        // 랜더링이 안 되기 때문에 userObj 의 크기를 줄여주는 작업
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    /*
    // Object.assign 은 target(빈 Object) 과 source 를 인자로 받음.
    // 원래 user 의 사본이 새 Object 의 형태로 생성됨.
    // 이 때문에 React.js 가 새로운 Object 의 생성을 감지하고 다시 랜더링함.
    setUserObj(Object.assign({}, user));
    */
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  // setInterval(() => {
  //   console.log(authService.currentUser);
  // }, 2000);
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "Initializing..."
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
