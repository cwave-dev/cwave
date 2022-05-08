import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  // const getNweets = async () => {
  //     const dbNweets = await dbService.collection("nweets").get();
  //     dbNweets.forEach(document => {
  //         const nweetObject = {
  //             ...document.data(),
  //             id: document.id,
  //         }
  //         setNweets(prev => [nweetObject, ...prev]);
  //     });
  // }
  // 왜 위의 방법은 실시간이 아니고 아래의 방법은 실시간인가.
  // onSnapshot? 이라고 하기엔 메세지 하나 올릴 때마다 <Home /> 을
  // 호출하는 것 같은데... 둘 다 매번 실행되는 건 같은 거 같은데?

  useEffect(() => {
    // getNweets();
    // onSnapshot 은 기본적으로 DB 에 무슨 일이 있을 때 알림을 받음.(CRUD 전부)
    dbService
      .collection("nweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const nweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNweets(nweetArray);
      });
  }, []);

  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
