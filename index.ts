import { MqttHandler } from "./handlers/MqttHandler";
import { HTTPHandler } from "./handlers/HTTPHandler";
import { LoggingHandler } from "./handlers/LoggingHandler";
import { StreamDeckFacade } from "./handlers/StreamDeckFacade";
StreamDeckFacade.initalize();
LoggingHandler.inizalize();
MqttHandler.intitalize();
HTTPHandler.initalize();
StreamDeckFacade.getInstance().setCleanStart();
