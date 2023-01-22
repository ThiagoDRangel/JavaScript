import mongoose from '../config/mongoose.js';

const { schema } = mongoose;
const Stormtrooper = new Schema({
  name: String,
  nickname: String,
  divisions: [ String ],
  patent: {
    type: String,
    enum: ['General', 'Coronel', 'Major', 'Captain', 'Lieutenant', 'Sergeant', 'Soldier']
  }
});

export default Stormtrooper;