## Socket integration with REACT

```npm i socket.io-client

```

first install socket.io-client in react using npm
\*\*

-  After installing socket.io-client integrate with react using useRef

```import { io } from "socket.io-client";


const ChatBox =()=>{

#### use useRef to create references for socket

  const socket = useRef();

#### use useEffect to initialize socket.io-client

   useEffect(() => {
    socket.current = io("Here use your server side link where server is running"); //http://localhost:4000/
 }, []);

}

```

\*\*
