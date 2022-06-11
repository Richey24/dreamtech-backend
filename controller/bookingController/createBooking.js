const { Room, Booking } = require('../../schema')

const createBookingController = async (req, res) => {
    const { checkInDate, checkOutDate, roomNum, cusId } = req.body
    if (checkInDate && checkOutDate && roomNum && cusId) {
        req.body.checkInDate = new Date(checkInDate)
        req.body.checkOutDate = new Date(checkOutDate)
        const book = await Booking.create(req.body)
        const room = await Room.findOneAndUpdate({ roomNum: roomNum }, {
            isAvailable: false,
            bkId: book._id
        }, { new: true })
        res.status(200).json({ book, room })
    } else {
        res.status(203).json({ message: "please send all the required information" })
    }
}

module.exports = createBookingController