const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: {
    type: String,
    required: true,
    set: (value) =>{
      if(!value.startsWith("+91")){
        return `+91${value}`
      }
      return value
    }
  },
  role: {
    type: String,
    enum: ['admin', 'customer'], // Add more if needed
    default: 'customer',
  },
});

module.exports = mongoose.model('User', userSchema);
