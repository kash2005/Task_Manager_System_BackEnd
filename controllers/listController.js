const list = require('../models/list');

exports.createList = async (req, res) => {
    const { title } = req.body;
    const userId = req.userId; // Get user ID from authenticated request
    try {
        const newList = new list({ title, user: userId });
        await newList.save();
        res.status(201).json({
            message: 'List created successfully', list: newList 
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to create list', error: error.message 
        });
    }
};

exports.updateList = async (req, res) => {
    const listId = req.params.id.trim();
    const { title } = req.body;
    const userId = req.userId; // Get user ID from authenticated request

    // console.log('Updating list with ID:', listId); // Debug log
    // console.log('User ID from token:', userId); // Log user ID

    try {   
        // Check if the list exists and belongs to the user
        // const existingList = await list.findOne({ _id: listId });
        // console.log('Existing list:', existingList); // Log existing list

        // Ensure that the list belongs to the logged-in user
        const updatedList = await list.findOneAndUpdate(
            { _id: listId, user: userId }, // Update only if it belongs to the user
            { title }, 
            { new: true }
        );

        // console.log('Updated list:', updatedList); // Log updated list
        if (!updatedList) {
            return res.status(404).json({
                message: 'List not found or not authorized' 
            });
        }

        res.status(200).json({
            message: 'List updated successfully',
            list: updatedList 
        });  
    } catch (error) {
        console.error('Error updating list:', error); // Log error for debugging
        res.status(500).json({
            message: 'Failed to update list',
            error: error.message 
        });
    }
};

exports.deleteList = async (req, res) => {
    const {id} = req.params;
    const userId = req.userId;

    try {
        const deletedList = await list.findOneAndDelete({ _id: id, user: userId });
        if (!deletedList) {
            return res.status(404).json({
                message: 'List not found or not authorized' 
            });
        }
        res.status(200).json({
            message: 'List deleted successfully',
            list: deletedList 
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete list',
            error: error.message 
        });
    }
};

exports.getLists = async (req, res) => {
    const userId = req.userId;
    try {
        const lists = await list.find({ user: userId});
        
        res.status(200).json({ message: 'Successfully get lists ' ,userId, lists });

    } catch (error) {
        res.status(500).json({ message: 'Failed to get lists', error: error.message });
    }
};

