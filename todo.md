## To do 
- [ ] Authentication of user (started working on)

## Errors 
-  ### Error connecting to database
    When trying to connect to the MongoDB Atlas cluster, you may encounter the following error:
  
    error msg
    ```
     Error connecting to database MongooseServerSelectionError: Could not connect to any servers in your MongoDB Atlas cluster. One common reason is that you're trying to access the database from an IP that isn't whitelisted. Make sure your current IP address is on your Atlas cluster's IP whitelist: https://www.mongodb.com/docs/atlas/security-whitelist/
        at _handleConnectionErrors (K:\projects\Budget-Tracker\Backend\node_modules\mongoose\lib\connection.js:809:11)
        at NativeConnection.openUri (K:\projects\Budget-Tracker\Backend\node_modules\mongoose\lib\connection.js:784:11)
        at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
      reason: TopologyDescription {
        type: 'ReplicaSetNoPrimary',
        servers: Map(3) {
          'ac-xoylbci-shard-00-00.ua7ffeh.mongodb.net:27017' => [ServerDescription],
          'ac-xoylbci-shard-00-01.ua7ffeh.mongodb.net:27017' => [ServerDescription],
          'ac-xoylbci-shard-00-02.ua7ffeh.mongodb.net:27017' => [ServerDescription]
        },
        stale: false,
        compatible: true,
        heartbeatFrequencyMS: 10000,
        localThresholdMS: 15,
        setName: 'atlas-13ewpr-shard-0',
        maxElectionId: null,
        maxSetVersion: null,
        commonWireVersion: 0,
        logicalSessionTimeoutMinutes: null
      },
      code: undefined
    }
    ```
    ![image](https://github.com/divy042000/Budget-Tracker/assets/108331571/8cd9d9d5-157b-4a12-b146-12c6f794ae4a)

- other errors here ....
