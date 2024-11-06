/**
 * integrating mediasoup server with a node.js application
 */

/* Please follow mediasoup installation requirements */
/* https://mediasoup.org/documentation/v3/mediasoup/installation/ */
import express from "express";
import cors from "cors";
import { config } from "dotenv";
import database from "./connectDB.js";
import streamModel from "./streams.js";

const app = express();

import https from "httpolyglot";
import fs from "fs";
import path from "path";
const __dirname = path.resolve();

config();
database();

import { Server } from "socket.io";
import mediasoup from "mediasoup";

app.get("*", (req, res, next) => {
  const path = "/sfu/";

  if (req.path.indexOf(path) == 0 && req.path.length > path.length)
    return next();

  res.send(
    `You need to specify a room name in the path e.g. 'https://127.0.0.1/sfu/room'`
  );
});

const options = {
  key: fs.readFileSync("./server/ssl/key.pem", "utf-8"),
  cert: fs.readFileSync("./server/ssl/cert.pem", "utf-8"),
};

const httpsServer = https.createServer(options, app);
httpsServer.listen(8000, () => {
  console.log("listening on port: " + 8000);
});

const io = new Server(httpsServer, {
  cors: {
    origin: "*",
  },
});

// socket.io namespace (could represent a room?)
const connections = io.of("/mediasoup");

app.use(cors);

/**
 * Worker
 * |-> Router(s)
 *     |-> Producer Transport(s)
 *         |-> Producer
 *     |-> Consumer Transport(s)
 *         |-> Consumer
 **/
let worker;
let rooms = {}; // { roomName1: { Router, rooms: [ sicketId1, ... ] }, ...}
let peers = {}; // { socketId1: { roomName1, socket, transports = [id1, id2,] }, producers = [id1, id2,] }, consumers = [id1, id2,], peerDetails }, ...}
let transports = []; // [ { socketId1, roomName1, transport, consumer }, ... ]
let producers = []; // [ { socketId1, roomName1, producer, }, ... ]
let consumers = [];
let roomsDetail = {}; // [ { socketId1, roomName1, consumer, }, ... ]
let streamDetail = {};
const createWorker = async () => {
  worker = await mediasoup.createWorker({
    rtcMinPort: 2000,
    rtcMaxPort: 10000,
  });
  console.log(`worker pid ${worker.pid}`);

  worker.on("died", (error) => {
    // This implies something serious happened, so kill the application
    console.error("mediasoup worker has died");
    setTimeout(() => process.exit(1), 2000); // exit in 2 seconds
  });

  return worker;
};

// We create a Worker as soon as our application starts
worker = createWorker();

// This is an Array of RtpCapabilities
// https://mediasoup.org/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpCodecCapability
// list of media codecs supported by mediasoup ...
// https://github.com/versatica/mediasoup/blob/v3/src/supportedRtpCapabilities.ts
const mediaCodecs = [
  {
    kind: "audio",
    mimeType: "audio/opus",
    clockRate: 48000,
    channels: 2,
  },
  {
    kind: "video",
    mimeType: "video/VP8",
    clockRate: 90000,
    parameters: {
      "x-google-start-bitrate": 1000,
    },
  },
];

connections.on("connection", async (socket) => {
  console.log(socket.id);
  socket.on("start-streaming", async ({ connected }, callback) => {
    console.log(connected);
    if (connected) {
      console.log("connected via mediasoup");
  
      socket.emit("connection-success", {
        socketId: socket.id,
        streamDetail,
        consumers:consumers,
      });
    }
  });

  socket.on("connected-client", ({ connected, roomName }) => {
    console.log("triggered");
    console.log(roomName);
    let hostData = {};
    producers.forEach((producerData) => {
      if (producerData.roomName === roomName) {
        if (!hostData[producerData.socketId]) {
          hostData[producerData.socketId] = [];
        }
        hostData[producerData.socketId].push([producerData.producer.id]);
      }
    });
    console.log(hostData);
    socket.emit("stream-data", hostData);
  });

  const removeItems = (items, socketId, type) => {
    items.forEach((item) => {
      if (item.socketId === socket.id) {
        item[type].close();
      }
    });
    items = items.filter((item) => item.socketId !== socket.id);

    return items;
  };

  socket.on("disconnect", async () => {
    // do some cleanup
    try{
    console.log("peer disconnected");
    const producerDetails = producers.find(
      (data) => socket.id == data.socketId
    );
    consumers = removeItems(consumers, socket.id, "consumer");
    producers = removeItems(producers, socket.id, "producer");
    transports = removeItems(transports, socket.id, "transport");
    if (peers[socket.id]) {
      const { roomName, peerDetails } = peers[socket.id];

      if (producerDetails?.admin) {
        await streamModel.findByIdAndUpdate(roomName, { status: "complete" });
      }
      //when host got disconnected, we will get roomname admin and send him evnet
      else {
        socket.to(roomName).emit("host:disconnected", { hostData: producerDetails });
        
      }
      delete peers[socket.id];
      console.log(producerDetails, "producerDetails");

      //if peer is admin then we well update stream status "complete"

      // remove socket from room
      let views = 0;
      let donesockets=[]
      consumers.forEach((cons) => {
        if (cons.roomName == roomName && cons.watcher && !donesockets.includes(cons.socketId)) {
          views += 1;
          donesockets.push(cons.socketId)
        }
      });
      console.log(views)
      console.log("tiis is room",roomName)
      socket.to(roomName).emit("stream:views", { views: views });
      rooms[roomName] = {
        router: rooms[roomName].router,
        peers: rooms[roomName].peers.filter(
          (socketId) => socketId !== socket.id
        ),
      };
    
    }
  }
  catch(err){
    console.log("err ",err)
  }
   
  });
  socket.on("createRoom", async ({ roomName }, callback) => {
    // create Router if it does not exist
    // const router1 = rooms[roomName] && rooms[roomName].get('data').router || await createRoom(roomName, socket.id)
    const router1 = await createRoom(roomName, socket.id);

    peers[socket.id] = {
      socket,
      roomName, // Name for the Router this Peer joined
      transports: [],
      producers: [],
      consumers: [],
      peerDetails: {
        name: "",
        isAdmin: "admin", // Is this Peer the Admin?
      },
    };

    // get Router RTP Capabilities
    const rtpCapabilities = router1.rtpCapabilities;

    // call callback from the client and send back the rtpCapabilities
    callback({ rtpCapabilities });
  });
  socket.on("joinRoom", async ({ roomName }, callback) => {
    // create Router if it does not exist
    // const router1 = rooms[roomName] && rooms[roomName].get('data').router || await createRoom(roomName, socket.id)

    const router1 = await createRoom(roomName, socket.id);
    socket.join(roomName);
    peers[socket.id] = {
      socket,
      roomName, // Name for the Router this Peer joined
      transports: [],
      producers: [],
      consumers: [],
      peerDetails: {
        name: "",
        isAdmin: false, // Is this Peer the Admin?
      },
    };

    // get Router RTP Capabilities
    const rtpCapabilities = router1.rtpCapabilities;

    // call callback from the client and send back the rtpCapabilities
    callback({ rtpCapabilities });
  });

  const createRoom = async (roomName, socketId) => {
    // worker.createRouter(options)
    // options = { mediaCodecs, appData }
    // mediaCodecs -> defined above
    // appData -> custom application data - we are not supplying any
    // none of the two are required
    let router1;
    let peers = [];
    if (rooms[roomName]) {
      router1 = rooms[roomName].router;
      peers = rooms[roomName].peers || [];
    } else {
      router1 = await worker.createRouter({ mediaCodecs });
    }

    console.log(`Router ID: ${router1.id}`, peers.length);

    rooms[roomName] = {
      router: router1,
      peers: [...peers, socketId],
    };

    return router1;
  };

  // socket.on('createRoom', async (callback) => {
  //   if (router === undefined) {
  //     // worker.createRouter(options)
  //     // options = { mediaCodecs, appData }
  //     // mediaCodecs -> defined above
  //     // appData -> custom application data - we are not supplying any
  //     // none of the two are required
  //     router = await worker.createRouter({ mediaCodecs, })
  //     console.log(`Router ID: ${router.id}`)
  //   }

  //   getRtpCapabilities(callback)
  // })

  // const getRtpCapabilities = (callback) => {
  //   const rtpCapabilities = router.rtpCapabilities

  //   callback({ rtpCapabilities })
  // }

  // Client emits a request to create server side Transport
  // We need to differentiate between the producer and consumer transports
  socket.on("createWebRtcTransport", async ({ consumer }, callback) => {
    // get Roo     m Name from Peer's properties
    const roomName = peers[socket.id].roomName;

    // get Router (Room) object this peer is in based on RoomName
    const router = rooms[roomName].router;

    createWebRtcTransport(router).then(
      (transport) => {
        callback({
          params: {
            id: transport.id,
            iceParameters: transport.iceParameters,
            iceCandidates: transport.iceCandidates,
            dtlsParameters: transport.dtlsParameters,
          },
        });

        // add transport to Peer's properties
        addTransport(transport, roomName, consumer);
      },
      (error) => {
        console.log(error);
      }
    );
  });

  const addTransport = (transport, roomName, consumer) => {
    transports = [
      ...transports,
      { socketId: socket.id, transport, roomName, consumer },
    ];

    peers[socket.id] = {
      ...peers[socket.id],
      transports: [...peers[socket.id].transports, transport.id],
    };
  };

  const addProducer = (producer, roomName, producerKind, admin) => {
    producers = [
      ...producers,
      { socketId: socket.id, producer, roomName, producerKind, admin },
    ];
    if (!roomsDetail[roomName]) {
      roomsDetail[roomName] = [];
    }

    peers[socket.id] = {
      ...peers[socket.id],
      producers: [...peers[socket.id].producers, producer.id],
    };
  };

  const addConsumer = (consumer, roomName,watcher) => {
    // add the consumer to the consumers list
    consumers = [...consumers, { socketId: socket.id, consumer, roomName,watcher }];

    // add the consumer id to the peers list
    peers[socket.id] = {
      ...peers[socket.id],
      consumers: [...peers[socket.id].consumers, consumer.id],
    };
  };

  socket.on("consumer:disLike",async ({ roomName, email }, callback) => {
    if (!streamDetail[roomName]) {
      streamDetail[roomName] = {
        emails: {},
        likes: 0,
        dislikes: 0,
      };
    }

    if (!streamDetail[roomName]["emails"][email]) {
      streamDetail[roomName]["dislikes"] += 1;

      streamDetail[roomName]["emails"][email] = {
        like: false,
        dislike: true,
      };
    } else {
      console.log(streamDetail[roomName]["emails"][email]);

      if (
        streamDetail[roomName]["emails"][email]["like"] &&
        !streamDetail[roomName]["emails"][email]["dislike"]
      ) {
        streamDetail[roomName]["likes"] -= 1;
        streamDetail[roomName]["emails"][email]["like"] = false;
        streamDetail[roomName]["emails"][email]["dislike"] = true;

        streamDetail[roomName]["dislikes"] += 1;
      } else if (
        !streamDetail[roomName]["emails"][email]["like"] &&
        streamDetail[roomName]["emails"][email]["dislike"]
      ) {
        streamDetail[roomName]["dislikes"] -= 1;
        streamDetail[roomName]["emails"][email]["dislike"] = false;
      }
      if (
        !streamDetail[roomName]["emails"][email]["like"] &&
        !streamDetail[roomName]["emails"][email]["dislike"]
      ) {
        delete streamDetail[roomName]["emails"][email];
      }
    }
    socket
      .to(roomName)
      .emit("stream:likeDetails", {
        like: streamDetail[roomName]["likes"],
        dislike: streamDetail[roomName]["dislikes"],
      });
    await streamModel.findByIdAndUpdate(roomName, { likes: streamDetail[roomName]["likes"] });
    await streamModel.findByIdAndUpdate(roomName, { dislikes: streamDetail[roomName]["dislikes"] });


    callback({
      like: streamDetail[roomName]["likes"],
      dislike: streamDetail[roomName]["dislikes"],
    });
  });

  socket.on("consumer:Like", async({ roomName, email }, callback) => {
    if (!streamDetail[roomName]) {
      streamDetail[roomName] = {
        emails: {},
        likes: 0,
        dislikes: 0,
      };
    }

    if (!streamDetail[roomName]["emails"][email]) {
      streamDetail[roomName]["likes"] += 1;
      streamDetail[roomName]["emails"][email] = {
        like: true,
        dislike: false,
      };
    } else {
      console.log(streamDetail[roomName]["emails"][email]);
      if (
        streamDetail[roomName]["emails"][email]["dislike"] &&
        !streamDetail[roomName]["emails"][email]["like"]
      ) {
        streamDetail[roomName]["likes"] += 1;
        streamDetail[roomName]["emails"][email]["like"] = true;
        streamDetail[roomName]["emails"][email]["dislike"] = false;

        streamDetail[roomName]["dislikes"] -= 1;
      } else if (
        streamDetail[roomName]["emails"][email]["like"] &&
        !streamDetail[roomName]["emails"][email]["dislike"]
      ) {
        streamDetail[roomName]["likes"] -= 1;
        streamDetail[roomName]["emails"][email]["like"] = false;
      }
      if (
        !streamDetail[roomName]["emails"][email]["like"] &&
        !streamDetail[roomName]["emails"][email]["dislike"]
      ) {
        delete streamDetail[roomName]["emails"][email];
      }
    }
    socket
      .to(roomName)
      .emit("stream:likeDetails", {
        like: streamDetail[roomName]["likes"],
        dislike: streamDetail[roomName]["dislikes"],
      });
      await streamModel.findByIdAndUpdate(roomName, { likes: streamDetail[roomName]["likes"] });
      await streamModel.findByIdAndUpdate(roomName, { dislikes: streamDetail[roomName]["dislikes"] });
    callback({
      like: streamDetail[roomName]["likes"],
      dislike: streamDetail[roomName]["dislikes"],
    });
  });

  socket.on("send-message", (data) => {
    socket.to(data.roomName).emit("recive-message", data);
  });
  socket.on("getProducers", (callback) => {
    //return all producer transports
    const { roomName } = peers[socket.id];

    let producerList = [];
    producers.forEach((producerData) => {
      if (
        producerData.socketId !== socket.id &&
        producerData.roomName === roomName
      ) {
        producerList.push([
          {
            producerId: producerData.producer.id,
            producerKind: producerData.producerKind,
          },
          producerData.socketId,
        ]);
      }
    });
    // return the producer list back to the client
    callback(producerList);
  });

  const informConsumers = (roomName, socketId, id, viewer) => {
    console.log(`just joined, id ${id} ${roomName}, ${socketId}`);
    // A new producer just joined

    // let all consumers to consume this producer

    let hostData = [];
    producers.forEach((producerData) => {
      if (
        producerData.socketId === socketId &&
        producerData.roomName === roomName
      ) {
        hostData.push({
          producerId: producerData.producer.id,
          producerKind: producerData.producerKind,
          viewer,
        });
      }
    });
    let producerRequired = 2;
    if (viewer) {
      producerRequired = 1;
    }
    if (hostData.length == producerRequired) {
      producers.forEach((producerData) => {
        if (
          producerData.socketId !== socketId &&
          producerData.roomName === roomName
        ) {
          const producerSocket = peers[producerData.socketId].socket;
          // use socket to send producer id to producer

          producerSocket.emit("new-producer", {
            hostData,
            socketId,
            viewer,
          });
        }
      });
    }
  };

  const getTransport = (socketId) => {
    const [producerTransport] = transports.filter(
      (transport) => transport.socketId === socketId && !transport.consumer
    );
    return producerTransport.transport;
  };

  //this socket event will accept the new host (1,2,3...) and it will send the present all producer to new host.
  socket.on("hosts:Accept", ({ roomName, waitingHosts }) => {
    let hostData = {};
    Object.entries(waitingHosts).forEach(([socketId, producerIds]) => {
      let newhostSocket = peers[socketId].socket;
      producers.forEach((producerData) => {
        if (
          producerData.socketId !== socketId &&
          producerData.roomName === roomName
        ) {
          if (!hostData[producerData.socketId]) {
            hostData[producerData.socketId] = [];
          }

          hostData[producerData.socketId].push({
            producerId: producerData.producer.id,
            producerKind: producerData.producerKind,
          });
        }
      });
      newhostSocket.emit("hosts:PresentHost", hostData);
    });
  });

  socket.on("hosts:shareNewHosts", ({ roomName, waitingHosts }) => {
    let waitingHostSocket = Object.keys(waitingHosts);
    let hostData = [];
    producers.forEach((producerData) => {
      if (
        !waitingHostSocket.includes(producerData.socketId) &&
        producerData.roomName === roomName
      ) {
        if (!hostData.includes(producerData.socketId)) {
          hostData.push(producerData.socketId);
        }
      }
    });
    consumers.forEach((producerData) => {
      if (
        !waitingHostSocket.includes(producerData.socketId) &&
        producerData.roomName === roomName
      ) {
        if (!hostData.includes(producerData.socketId)) {
          hostData.push(producerData.socketId);
        }
      }
    });
    hostData.forEach((socketId) => {
      const hostSocket = peers[socketId].socket;
      hostSocket.emit("hosts:AceptedHost", waitingHosts);
    });
  });
  socket.on("Call:DeclineCall", ({ producerId, roomName }) => {
    let socketId;
    producers.forEach((producerData) => {
      if (
        producerData.roomName === roomName &&
        producerData.producer.id === producerId
      ) {
        socketId = producerData.socketId;
      }
    });

    producers = removeItems(producers, socketId, "producer");
    if (peers[socketId]) {
      const { roomName } = peers[socketId];
      delete peers[socketId];

      // remove socket from room
      rooms[roomName] = {
        router: rooms[roomName].router,
        peers: rooms[roomName].peers.filter(
          (socketId_) => socketId_ !== socketId
        ),
      };
    }
  });

  // socket.on("Call:")
  // see client's socket.emit('transport-connect', ...)
  socket.on("transport-connect", ({ dtlsParameters }) => {
    console.log("DTLS PARAMS... ", { dtlsParameters });

    getTransport(socket.id).connect({ dtlsParameters });
  });

  // see client's socket.emit('transport-produce', ...)
  socket.on(
    "transport-produce",
    async ({ kind, rtpParameters, appData, admin, viewer }, callback) => {
      // call produce based on the prameters from the client
      const producer = await getTransport(socket.id).produce({
        kind,
        rtpParameters,
      });

      // add producer to the producers array
      const { roomName } = peers[socket.id];

      addProducer(producer, roomName, producer.kind, admin);
      informConsumers(roomName, socket.id, producer.id, viewer);

      console.log("Producer ID: ", producer.id, "kkind", producer.kind);

      producer.on("transportclose", () => {
        console.log("transport for tafis producer closed ");
        producer.close();
      });

      // Send back to the client the Producer's id
      callback({
        id: producer.id,
        producersExist: producers.length > 1 ? true : false,
      });
    }
  );

  // see client's socket.emit('transport-recv-connect', ...)
  socket.on(
    "transport-recv-connect",
    async ({ dtlsParameters, serverConsumerTransportId }) => {
      console.log(`DTLS PARAMS: ${dtlsParameters}`);
      const consumerTransport = transports.find(
        (transportData) =>
          transportData.consumer &&
          transportData.transport.id == serverConsumerTransportId
      ).transport;
      await consumerTransport.connect({ dtlsParameters });
    }
  );

  socket.on(
    "consume",
    async (
      { rtpCapabilities, remoteProducerId, serverConsumerTransportId,watcher},
      callback
    ) => {
      console.log("this is watcher ",watcher)

      try {
        console.log("in comsume from server");
        const { roomName } = peers[socket.id];

        console.log(roomName);
        const router = rooms[roomName].router;
        let consumerTransport = transports.find(
          (transportData) =>
            transportData.consumer &&
            transportData.transport.id == serverConsumerTransportId
        ).transport;

        // check if the router can consume the specified producer
        console.log("worked lastly.");

        if (
          router.canConsume({
            producerId: remoteProducerId,
            rtpCapabilities,
          })
        ) {
          // transport can now consume and return a consumer
          const consumer = await consumerTransport.consume({
            producerId: remoteProducerId,
            rtpCapabilities,
            paused: true,
          });

          consumer.on("transportclose", () => {
            console.log("transport close from consumer");
          });

          consumer.on("producerclose", () => {
            console.log("producer of consumer closed");
            socket.emit("producer-closed", { remoteProducerId });

            consumerTransport.close([]);
            transports = transports.filter(
              (transportData) =>
                transportData.transport.id !== consumerTransport.id
            );
            consumer.close();
            consumers = consumers.filter(
              (consumerData) => consumerData.consumer.id !== consumer.id
            );
          });

          addConsumer(consumer, roomName,watcher);
          let views = 0;
          let donesockets=[]
          consumers.forEach((cons) => {
            if (cons.roomName == roomName && cons.watcher && !donesockets.includes(cons.socketId)) {
              views += 1;
              donesockets.push(cons.socketId)
            }
          });
          
          socket.to(roomName).emit("stream:views", { views: views });
          await streamModel.findByIdAndUpdate(roomName, { views: views });
          // from the consumer extract the following params
          // to send back to the Client
          const params = {
            id: consumer.id,
            producerId: remoteProducerId,
            kind: consumer.kind,
            rtpParameters: consumer.rtpParameters,
            serverConsumerId: consumer.id,
          };

          // send the parameters to the client
          callback({ params });
        }
      } catch (error) {
        console.log("err.");

        console.log(error.message);
        callback({
          params: {
            error: error,
          },
        });
      }
    }
  );

  socket.on("consumer-resume", async ({ serverConsumerId }) => {
    console.log("consumer resume");
    const { consumer } = consumers.find(
      (consumerData) => consumerData.consumer.id === serverConsumerId
    );
    await consumer.resume();
  });
});

const createWebRtcTransport = async (router) => {
  return new Promise(async (resolve, reject) => {
    try {
      // https://mediasoup.org/documentation/v3/mediasoup/api/#WebRtcTransportOptions
      const webRtcTransport_options = {
        listenIps: [
          {
            ip: "0.0.0.0", // replace with relevant IP address
            announcedIp: process.env.MEDIASOUP_IP,
          },
        ],
        enableUdp: true,
        enableTcp: true,
        preferUdp: true,
      };

      // https://mediasoup.org/documentation/v3/mediasoup/api/#router-createWebRtcTransport
      let transport = await router.createWebRtcTransport(
        webRtcTransport_options
      );
      console.log(`transport id: ${transport.id}`);

      transport.on("dtlsstatechange", (dtlsState) => {
        if (dtlsState === "closed") {
          transport.close();
        }
      });

      transport.on("close", () => {
        console.log("transport closed");
      });

      resolve(transport);
    } catch (error) {
      reject(error);
    }
  });
};
