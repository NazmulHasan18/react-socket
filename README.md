## Socket integration with REACT

```npm i socket.io-client

```

first install socket.io-client in react using npm
\*\*

-  After installing socket.io-client integrate with react using useRef

```import { io } from "socket.io-client";


const ChatBox =()=>{

// use useRef to create references for socket

  const socket = useRef();

// use useEffect to initialize socket.io-client

   useEffect(() => {
    socket.current = io("Here use your server side link where server is running"); // http://localhost:4000/
 }, []);

}

```

### after initialization now you are ready to use

**In socket there is two word _on_ & _emit_ to impliment socket**

**Emit:** emit work like post and take two argument 1 is emit name and 2 is data you want to emit.

**on:** on work like get. By emit you sending a data and using _on_ you can receive data. Here socket.on('emit name', (arg)=>{console.log(arg)})

socket on take two arguments where 1st is emit name and 2nd data is a callback function what take a arguments that contain the data.

\*\*

```
useEffect(() => {
      socket?.current?.emit("addUsers", sender?._id);
   }, [sender]);

here in socket emit you are sending user id (user firebase id/user mongodb id)

```

```
   const handelMessage = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const text = e.currentTarget.text.value;
      const messageObj = {
         supportId,
         receiver: admin ? supportDetails.customerId._id : supportDetails.supportAgent,
         sender: admin ? supportDetails.supportAgent : supportDetails.customerId._id,
         text,
      };
      // console.log(messageObj);
      socket?.current?.emit("message", messageObj);


      // Here emit message sending message data to server


      setMessage([...message, messageObj as TMessage]);
      e.currentTarget.reset();

// Here store message in database

      fetch("http://localhost:4000/api/v2/create/message", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(messageObj),
      })
         .then((res) => res.json())
         .then((data) => console.log(data));
   };

// here getting all messages from database with support id

   useEffect(() => {
      fetch(`http://localhost:4000/api/v2/messages/${supportId}`)
         .then((res) => res.json())
         .then((data) => setMessage(data?.response?.messages));
   }, [supportId]);

// supportId you will get after creating support.

```

and all data should be store in frontend using state so that after every request it rerender the react component or ui

# here socket.current.on is using for creating React reference.

usually socket call either socket.emit or socket.on

socket.emit('emitName', {name: "nazmul Hasan", position: "full stack developer"})
socket.on('emitName', (arg)=>{
console.log(arg)

_/output: {name: "nazmul Hasan", position: "full stack developer"}/_
})

all file references in ChatBox.tsx file and **must use same name of emit and on that i use or else it on work cause backend using same name.**
