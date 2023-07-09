const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Hotel = require('../models/hotel');

mongoose.connect('mongodb://localhost:27017/travel-mate');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Hotel.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const room = new Hotel({
            //YOUR USER ID
            author: '6490cb23e09720b1009c52d1',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dxzfxzwd2/image/upload/v1687113508/TravelMate/ypebv2zotvtqjhs79frk.jpg',
                    filename: 'TravelMate/ypebv2zotvtqjhs79frk'
                },
                {
                    url: 'https://res.cloudinary.com/dxzfxzwd2/image/upload/v1687206314/TravelMate/usjkok7dupbxp0yjc5ji.jpg',
                    filename: 'TravelMate/usjkok7dupbxp0yjc5ji'
                }
            ]
        })
        await room.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
