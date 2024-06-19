import networkMapperObj from "./network_mapper.js";
import glueObj from "./glue.js";
import handlersFunc from "../utils/handlers.js";

export default function networkAdapter(connection, queue, myId, serverId) {
    const gameToNetwork = myId === serverId ?
        networkMapperObj.networkMapperServer({connection}) :
        networkMapperObj.networkMapperClient({connection, myId, serverId});
    const on = connection.on;
    const connectMapper = (mapperActions) => {
        const networkHandler = handlersFunc(mapperActions.actionKeys(), queue);
        const glued = glueObj.glueSimple(networkHandler, mapperActions);
        connection.registerHandler(networkHandler);
        return glued;
    };
    const connectObj = (actions) => connectMapper(glueObj.simpleMapper(actions));
    const getAction = gameToNetwork.getAction;
    return {
        on,
        connectMapper,
        connectObj,
        getAction
    };
}
