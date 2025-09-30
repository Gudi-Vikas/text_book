import express from 'express'
import fs from 'fs'
import newsModel from '../models/newsModel.js';


const newsAdd = async (req, res) => {
    try {
        const { title,desc } = req.body;
        const news = new newsModel({
            title,
            desc,
            image: req.file ? `/uploads/news/${req.file.filename}` : null,
        })
        await news.save(); 
        res.json({ success: true, message: "News Added" });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "All fields are required." })
    }

}

const newsRemove = async (req, res) => {
    try {
        // Check if request body exists and has an id
        if (!req.body || typeof req.body !== 'object') {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid request body" 
            });
        }

        const { id } = req.body;
        
        if (!id) {
            return res.status(400).json({ 
                success: false, 
                message: "News ID is required in the request body" 
            });
        }
        
        const news = await newsModel.findById(id);
        if (!news) {
            console.log(`News with ID ${id} not found`);
            return res.status(404).json({ 
                success: false, 
                message: "News not found" 
            });
        }
        
        // Delete the image file if it exists
        if (news.image) {
            const imagePath = `.${news.image}`;
            try {
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                    console.log(`Deleted image file: ${imagePath}`);
                }
            } catch (fileError) {
                console.error("Error deleting image file:", fileError);
                // Continue with news deletion even if image deletion fails
            }
        }
        
        // Delete the document from the database
        const result = await newsModel.deleteOne({ _id: id });
        
        if (result.deletedCount === 0) {
            console.log(`Failed to delete news with ID: ${id}`);
            return res.status(500).json({ 
                success: false, 
                message: "Failed to delete news" 
            });
        }
        
        console.log(`Successfully deleted news with ID: ${id}`);
        res.json({ 
            success: true, 
            message: "News Removed",
            deletedCount: result.deletedCount 
        })

    } catch (error) {
        console.error("Error removing News:", error);
        res.json({ success: false, message: "Error removing news", error: error.message });
    }
}
const allNews = async (req, res) => {
    try {
        const news = await newsModel.find({});
        res.json({ success: true, data: news });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error fetching news", error: error.message });
    }
}

export { newsAdd, newsRemove, allNews }