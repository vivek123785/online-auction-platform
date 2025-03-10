const Auction = require('../models/auction');

// ✅ Get all auctions
const getAuctions = async (req, res) => {
    try {
        const auctions = await Auction.find();
        if (!auctions.length) {
            return res.status(204).json({ message: 'No auctions available' }); // No Content
        }
        res.json(auctions);
    } catch (error) {
        console.error("❌ Error fetching auctions:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// ✅ Get a single auction by ID
const getAuctionById = async (req, res) => {
    try {
        const auction = await Auction.findById(req.params.id);
        if (!auction) {
            return res.status(404).json({ message: 'Auction not found' });
        }
        res.json(auction);
    } catch (error) {
        console.error("❌ Error fetching auction by ID:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// ✅ Get featured auctions
const getFeaturedAuctions = async (req, res) => {
    try {
        const featuredAuctions = await Auction.find({ featured: true });

        if (!featuredAuctions.length) {
            return res.status(204).json({ message: 'No featured auctions found' });
        }

        res.json(featuredAuctions);
    } catch (error) {
        console.error("❌ Error fetching featured auctions:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// ✅ Create a new auction
const createAuction = async (req, res) => {
    try {
        const { title, description, startingPrice, endTime, createdBy, featured } = req.body;

        // Validate required fields
        if (!title || !description || !startingPrice || !endTime || !createdBy) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Validate endTime
        if (isNaN(Date.parse(endTime))) {
            return res.status(400).json({ message: 'Invalid endTime format' });
        }

        const newAuction = new Auction({
            title,
            description,
            startingPrice,
            endTime: new Date(endTime),
            createdBy,
            featured: featured || false, // Default to false if not provided
            updatedAt: new Date(), // Track updates
        });

        await newAuction.save();
        res.status(201).json(newAuction);
    } catch (error) {
        console.error("❌ Error creating auction:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { getAuctions, createAuction, getAuctionById, getFeaturedAuctions };
