import mongoose from 'mongoose';

const AuthUser = 'Authuser';

async function connected() {
  try {
    const dbinstances = await mongoose.connect(
      `mongodb://localhost:27017/${AuthUser}`
    );

    console.log(
      ` MongoDB Database connect Successfull !! DB HOST ${dbinstances.connection.host}`
    );
  } catch (error) {
    console.log('Database connect Error');
  }
}

export default connected;
