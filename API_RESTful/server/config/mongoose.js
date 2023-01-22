import debug from 'debug';
import mongoose from 'mongoose';
import config from 'config';

const log = debug('ThiagoDRangel');
mongoose.connect(config.get('mongo.uri'), { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', (err) => log('mongodb err', err));

export default mongoose;