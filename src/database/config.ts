const mongoose = require('mongoose');


export const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`DB Online`);

    } catch (error) {
        console.error(error);
        throw new Error(`Couldn't start database, please try again later`);
    }


}


module.exports = {
    dbConnection
}