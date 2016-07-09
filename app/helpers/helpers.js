import logger from './logger.js';
import safeStringify from './safe-stringify.js';
import localStorage from './local-storage.js';
import vibrate from './vibrate.js';

class Helpers {

    constructor() {
        this.logger = logger;
        this.safeStringify = safeStringify;
        this.localStorage = localStorage;
        this.vibrate = vibrate;
    }
    
}

const helpers = new Helpers();

export default helpers;